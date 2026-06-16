import { Chart, Plugin } from 'chart.js'

import { Label } from '../Label'

import { interpolateArray } from './interpolateArray'
import { interpolateColors } from './interpolateColors'

export const interpolatedColorsPlugin: Plugin<'doughnut'> = {
  id: 'interpolatedColors',

  beforeInit(chart: Chart<"doughnut", number[], Label[]>) {
    //Your one-time logic here
    chart.data.datasets.forEach((dataset) => {
      const colors = dataset.backgroundColor as string[]
      const interpolated = interpolateArray(colors, interpolateColors)
      dataset.backgroundColor = interpolated
    })
    console.log('Interpolated Colors Plugin initialized')
  },
}
