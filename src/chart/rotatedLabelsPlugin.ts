import { Plugin, ArcElement, Element, ChartEvent, ActiveElement } from 'chart.js';
import { seasons, months } from './chartData';

// Constants for styling and positioning
const LABEL_STYLE_CONFIG = {
  SEASON: { FONT: 'bold 18px Arial', COLOR: '#000' },
  MONTH: { FONT: 'bold 13px Arial', COLOR: '#000' },
} as const;

const ROTATION_CONFIG = {
  PERPENDICULAR_OFFSET: Math.PI / 2,
  FLIP_THRESHOLD: {
    MIN: Math.PI / 2,
    MAX: (3 * Math.PI) / 2,
  },
  TEXT_FLIP_ADJUSTMENT: Math.PI,
} as const;

const DATASET_INDICES = { SEASONS: 0, MONTHS: 1 } as const;

interface ArcElementWithPosition extends ArcElement {
  x: number;
  y: number;
  startAngle: number;
  endAngle: number;
  innerRadius: number;
  outerRadius: number;
}

interface LabelPosition {
  x: number;
  y: number;
}

interface LabelConfiguration {
  text: string;
  font: string;
  color: string;
}

/**
 * Calculates the middle angle between start and end angles of an arc
 */
function calculateMiddleAngle(startAngle: number, endAngle: number): number {
  return (startAngle + endAngle) / 2;
}

/**
 * Calculates the middle radius between inner and outer radii
 */
function calculateMiddleRadius(innerRadius: number, outerRadius: number): number {
  return (innerRadius + outerRadius) / 2;
}

/**
 * Calculates the position where the label should be placed
 */
function calculateLabelPosition(
  centerX: number,
  centerY: number,
  angle: number,
  radius: number
): LabelPosition {
  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius,
  };
}

/**
 * Determines if text should be flipped based on its angle to maintain readability
 */
function shouldFlipTextForReadability(angle: number): boolean {
  return angle > ROTATION_CONFIG.FLIP_THRESHOLD.MIN &&
    angle < ROTATION_CONFIG.FLIP_THRESHOLD.MAX;
}

function calculateTextRotationAngle(middleAngle: number, shouldFlip: boolean): number {
  let rotationAngle = middleAngle + ROTATION_CONFIG.PERPENDICULAR_OFFSET;
  if (shouldFlip) {
    rotationAngle += ROTATION_CONFIG.TEXT_FLIP_ADJUSTMENT;
  }
  return rotationAngle;
}

function getLabelText(datasetIndex: number, elementIndex: number): string {
  if (datasetIndex === DATASET_INDICES.SEASONS) {
    return seasons[elementIndex]?.label || '';
  }
  if (datasetIndex === DATASET_INDICES.MONTHS) {
    return months[elementIndex]?.label || '';
  }
  return '';
}

function createLabelConfiguration(
  datasetIndex: number,
  elementIndex: number
): LabelConfiguration {
  const text = getLabelText(datasetIndex, elementIndex);
  const isSeasonDataset = datasetIndex === DATASET_INDICES.SEASONS;
  const styleConfig = isSeasonDataset ? LABEL_STYLE_CONFIG.SEASON : LABEL_STYLE_CONFIG.MONTH;

  return {
    text,
    font: styleConfig.FONT,
    color: styleConfig.COLOR,
  };
}

/**
 * Applies text styling to the canvas context
 */
function applyTextStyling(
  context: CanvasRenderingContext2D,
  configuration: LabelConfiguration
): void {
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = configuration.font;
  context.fillStyle = configuration.color;
}

/**
 * Renders a single label on the chart
 */
function renderLabel(
  context: CanvasRenderingContext2D,
  arcElement: ArcElementWithPosition,
  configuration: LabelConfiguration
): void {
  if (!configuration.text) {
    return;
  }

  const middleAngle = calculateMiddleAngle(arcElement.startAngle, arcElement.endAngle);
  const middleRadius = calculateMiddleRadius(arcElement.innerRadius, arcElement.outerRadius);

  const labelPosition = calculateLabelPosition(
    arcElement.x,
    arcElement.y,
    middleAngle,
    middleRadius
  );

  context.save();
  context.translate(labelPosition.x, labelPosition.y);

  const shouldFlip = shouldFlipTextForReadability(middleAngle);
  const rotationAngle = calculateTextRotationAngle(middleAngle, shouldFlip);
  context.rotate(rotationAngle);

  applyTextStyling(context, configuration);
  context.fillText(configuration.text, 0, 0);
  context.restore();
}

/**
 * Renders labels for all elements in a dataset
 */
function renderDatasetLabels(
  context: CanvasRenderingContext2D,
  datasetIndex: number,
  elements: Element[]
): void {
  elements.forEach((element, elementIndex) => {
    const arcElement = element as unknown as ArcElementWithPosition;
    const labelConfiguration = createLabelConfiguration(datasetIndex, elementIndex);

    renderLabel(context, arcElement, labelConfiguration);
  });
}

/**
 * Custom Chart.js plugin for rendering rotated labels inside doughnut charts
 */
export const rotatedLabelsPlugin: Plugin<'doughnut'> = {
  id: 'rotatedLabels',

  afterDatasetsDraw(chart) {
    const context = chart.ctx;
    const datasets = chart.config.data.datasets;

    datasets.forEach((_, datasetIndex) => {
      const datasetMeta = chart.getDatasetMeta(datasetIndex);
      renderDatasetLabels(context, datasetIndex, datasetMeta.data);
    });
  },
};
