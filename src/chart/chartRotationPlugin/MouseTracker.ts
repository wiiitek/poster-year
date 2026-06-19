
export class MouseTracker {
  private isMousePressed: boolean = false

  constructor(private canvasRectangle: DOMRect) {}

  private getMouseCoordinates(event: MouseEvent) {
    const rect = this.canvasRectangle
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return { x, y, rect }
  }

  handleMouseDown = (event: MouseEvent) => {
    this.isMousePressed = true
    const { x, y, rect } = this.getMouseCoordinates(event)
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    console.log(
      `Gesture start: mouse down at (${x.toFixed(2)}, ${y.toFixed(2)}), canvas center at (${centerX.toFixed(2)}, ${centerY.toFixed(2)})`
    )
  }

  handleMouseMove = (event: MouseEvent) => {
    if (!this.isMousePressed) return

    const { x, y, rect } = this.getMouseCoordinates(event)

    // Check if mouse is still within canvas bounds
    const isWithinCanvas =
      x >= 0 && x <= rect.width && y >= 0 && y <= rect.height

    if (isWithinCanvas) {
      console.log(`Mouse move: (${x.toFixed(2)}, ${y.toFixed(2)})`)
    } else {
      console.log(`Mouse left canvas`)
    }
  }

  handleMouseUp = (event: MouseEvent) => {
    this.isMousePressed = false
    const { x, y } = this.getMouseCoordinates(event)
    console.log(
      `Gesture end: mouse up at (${x.toFixed(2)}, ${y.toFixed(2)})`
    )
  }

  handleMouseLeave = () => {
    console.log(`Mouse left canvas area`)
  }
}

