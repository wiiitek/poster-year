
export class MouseActions {

  private centerX: number = 0
  private centerY: number = 0

  constructor(canvasRectangle: DOMRect) {
    console.log(
      `canvas left: ${canvasRectangle.left.toFixed(2)}, canvas top: ${canvasRectangle.top.toFixed(2)}`
    )
    this.centerX = canvasRectangle.left + canvasRectangle.width / 2
    this.centerY = canvasRectangle.top + canvasRectangle.height / 2
  }

  onStart(x: number, y: number) {
    console.log(
      `Gesture start: mouse down at (${x.toFixed(2)}, ${y.toFixed(2)})`
    )
  }

  onUpdate(x: number, y: number) {

    console.log(`Mouse move: (${x.toFixed(2)}, ${y.toFixed(2)})`)
  }
}
