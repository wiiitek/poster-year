import { RotationCalculator } from "./RotationCalculator"

export class MouseObserver {

  private isPressed: boolean = false
  private pendingX: number = 0
  private pendingY: number = 0
  private rafId: number | null = null

  constructor(private mouseActions: RotationCalculator) { }

  private getPointerCoordinates(event: PointerEvent) {
    const x: number = event.clientX
    const y: number = event.clientY
    return { x, y }
  }

  handlePointerDown = (event: PointerEvent) => {
    this.isPressed = true
    const { x, y } = this.getPointerCoordinates(event)
    this.mouseActions.onStart(x, y)
  }

  handlePointerMove = (event: PointerEvent) => {
    if (!this.isPressed) return

    // Store the latest coordinates
    const { x, y } = this.getPointerCoordinates(event)
    this.pendingX = x
    this.pendingY = y

    // Schedule update if not already scheduled
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(() => {
        this.mouseActions.onUpdate(this.pendingX, this.pendingY)
        this.rafId = null
      })
    }
  }

  handlePointerUp = (event: PointerEvent) => {
    this.isPressed = false
    const { x, y } = this.getPointerCoordinates(event)
    
    // Cancel any pending animation callback
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    
    // Final update at current position
    this.mouseActions.onUpdate(x, y)
  }
}


