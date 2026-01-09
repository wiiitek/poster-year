
const ROTATION_CONFIG = {
  // makes the label perpendicular to the radius
  PERPENDICULAR_OFFSET: Math.PI / 2,
} as const



export function calculateTextRotationAngle(middleAngle: number, perpendicular: boolean): number {
  let rotationAngle = middleAngle
  if (perpendicular) {
    rotationAngle += ROTATION_CONFIG.PERPENDICULAR_OFFSET
  }
  // normalize angle to be between -π and π
  while (rotationAngle > Math.PI) {
    rotationAngle -= 2 * Math.PI
  }
  while (rotationAngle < -Math.PI) {
    rotationAngle += 2 * Math.PI
  }
  return rotationAngle
}
