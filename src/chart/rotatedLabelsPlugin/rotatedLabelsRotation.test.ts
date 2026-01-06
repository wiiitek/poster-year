import { describe, it, expect } from 'vitest'
import { calculateTextRotationAngle } from './rotatedLabelsRotation'

describe('rotatedLabelsRotation', () => {

  describe('calculateTextRotationAngle', () => {

    describe('should normalize direction without perpendicular rotation', () => {
      it.each`
        description              | middleAngle         | expected
        ${'0 degrees (north)'}   | ${0}                | ${0}
        ${'180 degrees (south)'} | ${Math.PI}          | ${Math.PI}
        ${'270 degrees (east)'}   | ${3 * Math.PI / 2} | ${-Math.PI / 2}§
        ${'360 degrees (north)'} | ${2 * Math.PI}      | ${0}
      `('$description', ({ middleAngle, expected }) => {
        const perpendicular = false;
        const result = calculateTextRotationAngle(middleAngle, perpendicular)
        expect(result).toBeCloseTo(expected)
      })
    })

    describe('should normalize direction with perpendicular rotation', () => {
      it.each`
        description                       | middleAngle           | expected
        ${'0 degrees (north)'}            | ${0}                  | ${-Math.PI / 2}
        ${'45 degrees (northwest)'}       | ${Math.PI / 4}        | ${-Math.PI / 4}
        ${'135 degrees (southwest)'}      | ${3 * Math.PI / 4}    | ${Math.PI / 4}
        ${'315 degrees (northeast)'}      | ${7 * Math.PI / 4}    | ${Math.PI / 4}
        ${'225 degrees (southeast)'}      | ${5 * Math.PI / 4}    | ${-Math.PI / 4}
      `('$description with perpendicular', ({ middleAngle, expected }) => {
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
