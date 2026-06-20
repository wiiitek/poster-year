import { RotationCalculator } from "./RotationCalculator"

export class MouseObserver {

  private isMousePressed: boolean = false

  constructor(private mouseActions: RotationCalculator) { }

  private getMouseCoordinates(event: MouseEvent) {
    const x: number = event.clientX
    const y: number = event.clientY
    return { x, y }
  }

  handleMouseDown = (event: MouseEvent) => {
    this.isMousePressed = true
    const { x, y } = this.getMouseCoordinates(event)
    this.mouseActions.onStart(x, y)
  }

  handleMouseMove = (event: MouseEvent) => {
    if (this.isMousePressed) {
      const { x, y } = this.getMouseCoordinates(event)
      this.mouseActions.onUpdate(x, y)
    }
  }

  handleMouseUp = (event: MouseEvent) => {
    this.isMousePressed = false
    const { x, y } = this.getMouseCoordinates(event)
    this.mouseActions.onUpdate(x, y)
  }
}

