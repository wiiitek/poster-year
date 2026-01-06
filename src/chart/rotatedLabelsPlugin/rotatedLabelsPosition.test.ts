import { describe, it, expect } from 'vitest'
import { calculateLabelPosition, LabelPosition } from './rotatedLabelsPosition'

describe('rotatedLabelsPosition', () => {

  // calculates position relative to original chart center
  // from direction (angle) and distance (radius)
  describe('calculateLabelPosition', () => {
    it.each`
      description                   | centerX | centerY | middleAngle          | middleRadius | expectedX | expectedY
      ${'0 degrees (north)'}        | ${100}  | ${100}  | ${0}                 |      ${50}   | ${150}    | ${100}
      ${'90 degrees (west)'}        | ${100}  | ${100}  | ${Math.PI / 2}       |      ${50}   | ${100}    | ${150}
      ${'180 degrees (south)'}      | ${100}  | ${100}  | ${Math.PI}           |      ${50}   |  ${50}    | ${100}
      ${'270 degrees (east)'}       | ${100}  | ${100}  | ${3 * Math.PI / 2}   |      ${50}   | ${100}    |  ${50}
      ${'45 degrees (northeast)'}   | ${0}    | ${0}    | ${Math.PI / 4}       |     ${100}   |  ${70.71} |  ${70.71}
    `('should calculate correct position at $description', ({ centerX, centerY, middleAngle, middleRadius, expectedX, expectedY }) => {
      const result: LabelPosition = calculateLabelPosition(centerX, centerY, middleAngle, middleRadius)

      expect(result.x).toBeCloseTo(expectedX)
      expect(result.y).toBeCloseTo(expectedY)
    })
  })
});
