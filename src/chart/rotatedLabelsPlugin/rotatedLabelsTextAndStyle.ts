const DATASET_INDICES = { MONTHS: 0, SEASONS: 1 } as const

// Constants for styling and positioning
const LABEL_STYLE_CONFIG = {
  MONTH: { FONT: 'bold 13px Arial', COLOR: '#000' },
  SEASON: { FONT: 'bold 18px Arial', COLOR: '#000' },
} as const

export interface LabelConfiguration {
  text: string;
  font: string;
  color: string;
}

export function createLabelConfiguration(
  multiLabels: string[][],
  datasetIndex: number,
  elementIndex: number
): LabelConfiguration {
  const labels: string[] = multiLabels[datasetIndex]
  const text = labels[elementIndex] || ''

  const isMonthsDataset = datasetIndex === DATASET_INDICES.MONTHS
  const styleConfig = isMonthsDataset ? LABEL_STYLE_CONFIG.MONTH : LABEL_STYLE_CONFIG.SEASON

  return {
    text,
    font: styleConfig.FONT,
    color: styleConfig.COLOR,
  }
}
