import { ChartRotation } from "./ChartRotation"

/**
 * Calculates the rotation of a chart based on mouse positions.
 * 
 * Based on mouse position calculate the angle of rotation.
 */
export class RotationCalculator {

  // private centerX: number = 0
  // private centerY: number = 0

  private startX: number = 0
  private startY: number = 0

  /**
   * @param centerX - X coordinate of the chart center.
   * @param centerY - Y coordinate of the chart center.
   * @param chartRotation - Wrapper for chart to perform rotations.
   */
  constructor(private centerX: number, private centerY: number, private chartRotation: ChartRotation) {
    console.log(
      `center X: ${centerX.toFixed(2)}, center Y: ${centerY.toFixed(2)}`
    )
    // this.centerX = canvasRectangle.left + canvasRectangle.width / 2
    // this.centerY = canvasRectangle.top + canvasRectangle.height / 2
  }

  onStart(x: number, y: number) {
    this.startX = x
    this.startY = y
    console.log(
      `Gesture start: mouse down at (${x.toFixed(2)}, ${y.toFixed(2)})`
    )
  }

  onUpdate(x: number, y: number) {
    console.log(`Mouse move: (${x.toFixed(2)}, ${y.toFixed(2)})`)
  }
}
