import { Chart, Plugin } from 'chart.js'
import { Label } from '../Label'
import { ChartRotation } from './ChartRotation'
import { RotationCalculator } from './RotationCalculator'
import { MouseObserver } from './MouseObserver'

export const chartRotationPlugin: Plugin<'doughnut'> = {
  id: 'chartRotation',

  afterInit(chart: Chart<'doughnut', number[], Label[]>) {
    const canvasElement: HTMLCanvasElement = chart.canvas
    const canvasRectangle: DOMRect = canvasElement.getBoundingClientRect()
    const chartRotation = new ChartRotation(chart)
    const rotationCalculator = new RotationCalculator(canvasRectangle, chartRotation)
    const mouseObserver = new MouseObserver(rotationCalculator)

    // Add event listeners
    document.addEventListener('mousedown', mouseObserver.handleMouseDown)
    document.addEventListener('mousemove', mouseObserver.handleMouseMove)
    document.addEventListener('mouseup', mouseObserver.handleMouseUp)
  },
}
