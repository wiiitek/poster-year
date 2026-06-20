import { Chart, Plugin } from 'chart.js'
import { Label } from '../Label'
import { MouseActions } from './MouseActions'
import { MouseObserver } from './MouseObserver'

export const chartRotationPlugin: Plugin<'doughnut'> = {
  id: 'chartRotation',

  afterInit(chart: Chart<'doughnut', number[], Label[]>) {
    const canvasElement: HTMLCanvasElement = chart.canvas
    const canvasRectangle: DOMRect = canvasElement.getBoundingClientRect()
    const mouseActions = new MouseActions(canvasRectangle)
    const mouseObserver = new MouseObserver(mouseActions)

    // Add event listeners
    document.addEventListener('mousedown', mouseObserver.handleMouseDown)
    document.addEventListener('mousemove', mouseObserver.handleMouseMove)
    document.addEventListener('mouseup', mouseObserver.handleMouseUp)
  },
}
