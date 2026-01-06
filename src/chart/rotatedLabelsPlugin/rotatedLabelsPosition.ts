
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
