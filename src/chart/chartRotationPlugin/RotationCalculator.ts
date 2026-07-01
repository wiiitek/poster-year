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

  private previousAngle: number = 0

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
    this.previousAngle = this.calculateAngle(x, y)
    console.log(
      `Gesture start: mouse down at (${x.toFixed(2)}, ${y.toFixed(2)})`
    )
  }

  onUpdate(x: number, y: number) {
    const currentAngle = this.calculateAngle(x, y)
    const angleDelta = this.previousAngle - currentAngle
    const angleDeltaDegrees = (angleDelta * 180)

    if (angleDeltaDegrees !== 0) {
      // chart rotations are: positive = clockwise
      this.chartRotation.rotateChart(-angleDeltaDegrees)
    }

    this.previousAngle = currentAngle
  }

  /**
   * Calculate the angle (degrees) of rotation for a given position,
   * relative to the canvas center.
   * 
   * Algorithm:
   * 1. Normalize coordinates so that the center is at [0,0]
   * 2. Calculate the angle using atan2
   * 
   * @param x - Current X coordinate
   * @param y - Current Y coordinate
   * @returns Angle in radians, divided by PI
   */
  calculateAngle(x: number, y: number): number {
    const normalizedX = x - this.centerX
    const normalizedY = y - this.centerY
    return Math.atan2(normalizedY, normalizedX) / Math.PI
  }
}
