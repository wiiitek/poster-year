import { Plugin, ArcElement, Element } from 'chart.js';
import { calculateLabelPosition, LabelPosition, calculateTextRotationAngle } from './rotatedLabelsCalculations';
import { seasons, months } from './chartData';

// Constants for styling and positioning
const LABEL_STYLE_CONFIG = {
  SEASON: { FONT: 'bold 18px Arial', COLOR: '#000' },
  MONTH: { FONT: 'bold 13px Arial', COLOR: '#000' },
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

interface LabelConfiguration {
  text: string;
  font: string;
  color: string;
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

function applyTextStyling(
  context: CanvasRenderingContext2D,
  configuration: LabelConfiguration
): void {
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = configuration.font;
  context.fillStyle = configuration.color;
}

function renderLabel(
  context: CanvasRenderingContext2D,
  arcElement: ArcElementWithPosition,
  configuration: LabelConfiguration
): void {
  if (!configuration.text) {
    return;
  }

  const middleAngle = (arcElement.startAngle + arcElement.endAngle) / 2;
  const middleRadius = (arcElement.innerRadius + arcElement.outerRadius) / 2;

  const labelPosition: LabelPosition = calculateLabelPosition(arcElement.x, arcElement.y, middleAngle, middleRadius);

  context.save();
  context.translate(labelPosition.x, labelPosition.y);

  const rotationAngle = calculateTextRotationAngle(middleAngle);
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
