import { Chart } from 'chart.js'

import { Label } from '../Label'

export interface RotationIntegration {
  rotateChart(degrees: number): void
}

export class RotationIntegrationImpl implements RotationIntegration {

  constructor(private chart: Chart<"doughnut", number[], Label[]>) { }

  rotateChart(degrees: number) {
    const currentRotation = this.chart.options.rotation || 0
    const newRotation = currentRotation + degrees
    console.log(`Rotating chart from ${currentRotation.toFixed(2)}° to ${newRotation.toFixed(2)}°`)
    this.chart.options.rotation = newRotation
    this.chart.update()
  }
}
