import { RotationIntegration } from "./RotationIntegration"

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
   * @param rotatingEngine - Wrapper for chart to perform rotations.
   */
  constructor(private centerX: number, private centerY: number, private rotatingEngine: RotationIntegration) {
    console.log(
      `center X: ${centerX.toFixed(2)}, center Y: ${centerY.toFixed(2)}`
    )
  }

  onStart(x: number, y: number) {
    this.previousAngle = this.calculateAngle(x, y)
  }

  onUpdate(x: number, y: number) {
    const currentAngle = this.calculateAngle(x, y)
    const angleDelta = currentAngle - this.previousAngle
    let rotation = angleDelta

    if (angleDelta > 180) {
      // then let's rotate the other way around, to avoid a big jump
      rotation = angleDelta - 360
    } else if (angleDelta < -180) {
      // then let's rotate the other way around, to avoid a big jump
      rotation = angleDelta + 360
    }

    if (rotation !== 0) {
      this.rotatingEngine.rotateChart(rotation)
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
   * @returns Angle in degrees
   */
  calculateAngle(x: number, y: number): number {
    const normalizedX = x - this.centerX
    const normalizedY = y - this.centerY
    return 180 * Math.atan2(normalizedY, normalizedX) / Math.PI
  }
}
