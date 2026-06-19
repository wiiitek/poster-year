import { Chart, Plugin } from 'chart.js'
import { Label } from '../Label'

export const chartRotationPlugin: Plugin<'doughnut'> = {
  id: 'chartRotation',

  afterInit(chart: Chart<'doughnut', number[], Label[]>) {
    const canvasElement = chart.canvas
    let isMousePressed = false

    // Get canvas rectangle for coordinate calculations
    const getCanvasRect = () => canvasElement.getBoundingClientRect()

    // Mouse down - gesture start
    const handleMouseDown = (event: MouseEvent) => {
      isMousePressed = true
      const rect = getCanvasRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      console.log(
        `Gesture start: mouse down at (${x.toFixed(2)}, ${y.toFixed(2)}), canvas center at (${centerX.toFixed(2)}, ${centerY.toFixed(2)})`
      )
    }

    // Mouse move - track movement and detect canvas exit (only if mouse button is pressed)
    const handleMouseMove = (event: MouseEvent) => {
      if (!isMousePressed) return

      const rect = getCanvasRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Check if mouse is still within canvas bounds
      const isWithinCanvas =
        x >= 0 && x <= rect.width && y >= 0 && y <= rect.height

      if (isWithinCanvas) {
        console.log(`Mouse move: (${x.toFixed(2)}, ${y.toFixed(2)})`)
      } else {
        console.log(`Mouse left canvas`)
      }
    }

    // Mouse up - gesture end
    const handleMouseUp = (event: MouseEvent) => {
      isMousePressed = false
      const rect = getCanvasRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      console.log(
        `Gesture end: mouse up at (${x.toFixed(2)}, ${y.toFixed(2)})`
      )
    }

    // Mouse leave - canvas area exit (fallback detection)
    const handleMouseLeave = () => {
      console.log(`Mouse left canvas area`)
    }

    // Add event listeners
    canvasElement.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    canvasElement.addEventListener('mouseleave', handleMouseLeave)
  },
}
