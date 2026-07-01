import { Chart, Plugin } from 'chart.js'

import { Label } from '../Label'

export interface RotatingEngine {
  rotateChart(degrees: number): void
}

export class RotatingEngineImpl implements RotatingEngine {

  constructor(private chart: Chart<"doughnut", number[], Label[]>) { }

  rotateChart(degrees: number) {
    const currentRotation = this.chart.options.rotation || 0
    const newRotation = currentRotation + degrees
    console.log(`Rotating chart from ${currentRotation.toFixed(2)}° to ${newRotation.toFixed(2)}°`)
    this.chart.options.rotation = newRotation
    this.chart.update()
  }
}
