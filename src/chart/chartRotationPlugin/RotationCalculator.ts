import { ChartRotation } from "./ChartRotation"

/**
 * Calculates the rotation of a chart based on mouse positions.
 * 
 * Based on mouse position calculate the angle of rotation.
 */
export interface RotationCalculator {
  onStart(x: number, y: number): void
  onUpdate(x: number, y: number): void
  calculateAngle(x: number, y: number): number
}
export class RotationCalculatorImpl implements RotationCalculator {

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
  }

  onStart(x: number, y: number) {
    this.startX = x
    this.startY = y
    console.log(
      `Gesture start: mouse down at (${x.toFixed(2)}, ${y.toFixed(2)})`
    )
  }

  onUpdate(x: number, y: number) {
    const angle = this.calculateAngle(x, y)
    if (angle !== 0) {
      this.chartRotation.rotateChart(angle)
    }
  }


  /**
   * Calculate the angle of rotation between start position and current position,
   * relative to the canvas center.
   * 
   * Algorithm:
   * 1. Normalize coordinates so that the center is at [0,0]
   * 2. Calculate the angle using atan2
   * 
   * @param x - Current X coordinate
   * @param y - Current Y coordinate
   * @returns Angle change in degrees (positive = counter-clockwise)
   */
  calculateAngle(x: number, y: number): number {
    // 1. Normalize coordinates (center becomes [0,0])
    const normalizedStartX = this.startX - this.centerX
    const normalizedStartY = this.startY - this.centerY
    if (normalizedStartX === 0 && normalizedStartY === 0) {
      // starting from center of the chart: cannot tell the rotation
      return 0
    } else {

      const normalizedCurrentX = x - this.centerX
      const normalizedCurrentY = y - this.centerY

      // 2. Calculate angles using atan2
      const startAngle = Math.atan2(normalizedStartY, normalizedStartX) / Math.PI
      const currentAngle = Math.atan2(normalizedCurrentY, normalizedCurrentX) / Math.PI

      // Calculate the difference in radians and convert to degrees
      const angleDelta = startAngle - currentAngle
      const angleDeltaDegrees = (angleDelta * 180) 

      // chart rotations are: positive = clockwise
      return -angleDeltaDegrees
    }
  }
}
