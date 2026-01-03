
const ROTATION_CONFIG = {
  // makes the label perpendicular to the radius
  PERPENDICULAR_OFFSET: Math.PI / 2,
  FLIP_THRESHOLD: {
    MIN: Math.PI / 2,
    MAX: (3 * Math.PI) / 2,
  },
  TEXT_FLIP_ADJUSTMENT: Math.PI,
} as const;

export interface LabelPosition {
  x: number;
  y: number;
}

export function calculateLabelPosition(
  centerX: number,
  centerY: number,
  middleAngle: number,
  middleRadius: number
): LabelPosition {
  return {
    x: centerX + Math.cos(middleAngle) * middleRadius,
    y: centerY + Math.sin(middleAngle) * middleRadius,
  };
}

/**
 * Determines if text should be flipped based on its angle to maintain readability.
 * Text should NOT be upside-down. We measure angles counter-clockwise.
 * 
 * param middleAngle - direction of a middle radius for an arc (in radians)
 * 
 * returns boolean - true if text should be flipped to be readable
 */
function shouldFlipTextForReadability(middleAngle: number): boolean {
  const north = 0;
  const west = Math.PI / 2;
  const south = Math.PI;

  const quadrant2 = middleAngle >= north && middleAngle < west;
  const quadrant3 = middleAngle >= west && middleAngle < south;

  return quadrant2 || quadrant3;
}

export function calculateTextRotationAngle(middleAngle: number): number {
  let rotationAngle = middleAngle + ROTATION_CONFIG.PERPENDICULAR_OFFSET;
  const shouldFlip = shouldFlipTextForReadability(middleAngle);
  if (shouldFlip) {
    rotationAngle += ROTATION_CONFIG.TEXT_FLIP_ADJUSTMENT;
  }
  return rotationAngle;
}
