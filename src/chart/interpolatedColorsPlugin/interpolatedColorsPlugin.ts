import { Chart, Plugin } from 'chart.js'

import { Label } from '../Label'

import { interpolateArray } from './interpolateArray'
import { interpolateColors } from './interpolateColors'

// transparent grey
const FALLBACK_COLOR = '#EEEEEEEE'

export const interpolatedColorsPlugin: Plugin<'doughnut'> = {
  id: 'interpolatedColors',

  beforeInit(chart: Chart<"doughnut", number[], Label[]>) {
    chart.data.datasets.forEach((dataset) => {
      const colors = dataset.backgroundColor
      // skip if colors are non-string or non-array
      if (!Array.isArray(colors) || colors.some((c) => typeof c !== 'string')) return

      const interpolated = interpolateArray(colors, interpolateColors)
        .map((color) => color ?? FALLBACK_COLOR) // replace undefined with fallback color
      dataset.backgroundColor = interpolated
    })
    console.log('Interpolated Colors Plugin initialized')
  },
}
