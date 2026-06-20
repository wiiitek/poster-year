import { Chart, Plugin } from 'chart.js'
import { Label } from '../Label'
import { ChartRotation, ChartRotationImpl } from './ChartRotation'
import { RotationCalculator, RotationCalculatorImpl } from './RotationCalculator'
import { MouseObserver } from './MouseObserver'

export const chartRotationPlugin: Plugin<'doughnut'> = {
  id: 'chartRotation',

  afterInit(chart: Chart<'doughnut', number[], Label[]>) {

    const chartRotation: ChartRotation = new ChartRotationImpl(chart)

    const canvasRectangle: DOMRect = chart.canvas.getBoundingClientRect()
    const centerX = canvasRectangle.left + canvasRectangle.width / 2
    const centerY = canvasRectangle.top + canvasRectangle.height / 2
    const rotationCalculator: RotationCalculator = new RotationCalculatorImpl(centerX, centerY, chartRotation)

    const mouseObserver = new MouseObserver(rotationCalculator)

    // Add pointer event listeners (works with mouse, touch, and pen)
    document.addEventListener('pointerdown', mouseObserver.handlePointerDown)
    document.addEventListener('pointermove', mouseObserver.handlePointerMove)
    document.addEventListener('pointerup', mouseObserver.handlePointerUp)
  },
}
