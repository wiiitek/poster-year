
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

/**
 * Calculates polar-to-cartesian coordinate conversion for label placement.
 * 
 * @param centerX vertical center of the doughnut chart
 * @param centerY horizontal center of the doughnut chart
 * @param middleAngle direction of an arc element (in radians)
 * @param middleRadius required distance from the center
 * @returns 
 */
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
 * param angle - direction of a text (in radians)
 * 
 * returns boolean - true if text should be flipped to be readable
 */
function shouldFlipTextForReadability(angle: number): boolean {
  const north = 0;
  const west = Math.PI / 2;
  const south = Math.PI;
  const east = (3 * Math.PI) / 2;

  // direction quadrants numbering:
  //     2 | 1
  //    -------
  //     3 | 4
  const quadrant2 = angle >= north && angle < west;
  const quadrant3 = angle >= west && angle < south;

  return quadrant2 || quadrant3;
}

export function calculateTextRotationAngle(middleAngle: number, perpendicular: boolean): number {
  let rotationAngle = middleAngle 
  if (perpendicular) {
    rotationAngle += ROTATION_CONFIG.PERPENDICULAR_OFFSET;
  }
  const shouldFlip = shouldFlipTextForReadability(rotationAngle);
  if (shouldFlip) {
    rotationAngle += ROTATION_CONFIG.TEXT_FLIP_ADJUSTMENT;
  }
  return rotationAngle;
}
