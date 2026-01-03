import { seasons, months } from '../chartData';

const DATASET_INDICES = { SEASONS: 0, MONTHS: 1 } as const;

// Constants for styling and positioning
const LABEL_STYLE_CONFIG = {
  SEASON: { FONT: 'bold 18px Arial', COLOR: '#000' },
  MONTH: { FONT: 'bold 13px Arial', COLOR: '#000' },
} as const;

export interface LabelConfiguration {
  text: string;
  font: string;
  color: string;
}

export function createLabelConfiguration(
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

function getLabelText(datasetIndex: number, elementIndex: number): string {
  if (datasetIndex === DATASET_INDICES.SEASONS) {
    return seasons[elementIndex]?.label || '';
  }
  if (datasetIndex === DATASET_INDICES.MONTHS) {
    return months[elementIndex]?.label || '';
  }
  return '';
}
