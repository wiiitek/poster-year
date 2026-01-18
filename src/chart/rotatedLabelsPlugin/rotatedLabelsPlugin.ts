import { Chart, Plugin } from 'chart.js'

import { Label } from '../Label'
import { renderDatasetLabels } from './rotatedLabelsRenderer'

/**
 * Custom Chart.js plugin for rendering rotated labels inside doughnut charts
 */
export const rotatedLabelsPlugin: Plugin<'doughnut'> = {
  id: 'rotatedLabels',

  afterDatasetsDraw(chart: Chart<"doughnut", number[], Label[]>) {
    const context = chart.ctx
    const datasets = chart.config.data.datasets

    const multiLabels = chart.data.labels as Label[][]

    datasets.forEach((_, datasetIndex) => {
      const datasetMeta = chart.getDatasetMeta(datasetIndex)
      renderDatasetLabels(multiLabels, context, datasetIndex, datasetMeta.data)
    })
  },
}
