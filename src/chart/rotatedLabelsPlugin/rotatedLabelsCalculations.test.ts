import { describe, it, expect } from 'vitest'
import { calculateLabelPosition, calculateTextRotationAngle, LabelPosition } from './rotatedLabelsCalculations'

describe('rotatedLabelsCalculations', () => {

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

  describe('calculateTextRotationAngle', () => {

    describe('text directed same way as an arc', () => {
      it.each`
        description                                          | middleAngle      | expected
        ${'0 degrees should return the same angle (north)'}  | ${0}             | ${Math.PI}
        ${'180 degrees should also return the same (south)'} | ${Math.PI}       | ${Math.PI}
      `('should return same angle when no flip needed', ({ middleAngle, expected }) => {
        const perpendicular = false;
        const result = calculateTextRotationAngle(middleAngle, perpendicular)
        expect(result).toBeCloseTo(expected)
      })
    })

    describe('with perpendicular rotation', () => {
      it.each`
        arcDirection                             | middleAngle           | expectedStr       | expected
        ${'0 degrees (north)'}.                  | ${0}                  | ${'-90 degrees'}  | ${-Math.PI / 2}
        ${'45 degrees (northwest)'}              | ${Math.PI / 4}        | ${'-45 degrees'}  | ${-Math.PI / 4}
        ${'135 degrees (southwest)'}             | ${3 * Math.PI / 4}    | ${'-135 degrees'} | ${Math.PI / 4}
        ${'315 degrees (northeast)'}             | ${7 * Math.PI / 4}    |  ${''}            | ${Math.PI / 4}
        ${'225 degrees (southeast)'}             | ${5 * Math.PI / 4}    | ${'-45 degrees'}  | ${-Math.PI / 4}
      `('$arcDirection should show label at $expectedStr', ({ middleAngle, expected }) => {
        const perpendicular = true;
        let result = calculateTextRotationAngle(middleAngle, perpendicular)
        // normalizes result so that it is easier to compare (result should be between -π and π)
        while (result > Math.PI) {
          result -= (2 * Math.PI);
        }
        expect(result).toBeCloseTo(expected)
      })
    })
  })
})
