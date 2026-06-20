import { Chart, Plugin } from 'chart.js'

import { Label } from '../Label'

export class ChartRotation {

  constructor(private chart: Chart<"doughnut", number[], Label[]>) { }

  rotateChart(degrees: number) {
    this.chart.options.rotation = degrees
    this.chart.update()
  }
}
