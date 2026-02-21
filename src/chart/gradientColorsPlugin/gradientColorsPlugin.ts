import { Chart, Plugin } from 'chart.js'

import { Label } from '../Label'

export const gradientColorsPlugin: Plugin<'doughnut'> = {
  id: 'gradientColors',

  beforeInit(chart: Chart<"doughnut", number[], Label[]>) {
    // Your one-time logic here
    chart.data.datasets.forEach((dataset) => {
      
      const colors = dataset.backgroundColor as string[]
      
    //   const ctx = chart.ctx
    //   const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, chart.height)
    //   gradient.addColorStop(0, 'rgba(255, 99, 132, 0.5)')
    //   gradient.addColorStop(1, 'rgba(23, 255, 38, 0.8)')
    //   dataset.backgroundColor = gradient
    })
    console.log('Gradient Colors Plugin initialized')
  },
}
