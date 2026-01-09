import { Plugin } from 'chart.js'
import { renderDatasetLabels } from './rotatedLabelsRenderer'

/**
 * Custom Chart.js plugin for rendering rotated labels inside doughnut charts
 */
export const rotatedLabelsPlugin: Plugin<'doughnut'> = {
  id: 'rotatedLabels',

  afterDatasetsDraw(chart) {
    const context = chart.ctx
    const datasets = chart.config.data.datasets

    datasets.forEach((_, datasetIndex) => {
      const datasetMeta = chart.getDatasetMeta(datasetIndex)
      renderDatasetLabels(context, datasetIndex, datasetMeta.data)
    })
  },
}
