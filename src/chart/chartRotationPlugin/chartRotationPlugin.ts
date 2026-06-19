import { Chart, Plugin } from 'chart.js'
import { Label } from '../Label'
import { MouseTracker } from './MouseTracker'

export const chartRotationPlugin: Plugin<'doughnut'> = {
  id: 'chartRotation',

  afterInit(chart: Chart<'doughnut', number[], Label[]>) {
    const canvasElement: HTMLCanvasElement = chart.canvas
    const canvasRectangle: DOMRect = canvasElement.getBoundingClientRect()
    const mouseTracker = new MouseTracker(canvasRectangle)

    // Add event listeners
    canvasElement.addEventListener('mousedown', mouseTracker.handleMouseDown)
    document.addEventListener('mousemove', mouseTracker.handleMouseMove)
    document.addEventListener('mouseup', mouseTracker.handleMouseUp)
  },
}
