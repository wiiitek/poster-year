import { describe, it, expect } from 'vitest'
import { InterpolationFunction } from './InterpolationFunction'
import { interpolateArray, splitIntoParts } from './interpolateArray'

const dummyInterpolation: InterpolationFunction = (start: string, end: string, steps: number): string[] => {
  const startNum = parseInt(start)
  const endNum = parseInt(end)
  const stepSize = (endNum - startNum) / (steps - 1)

  const result: string[] = []
  for (let i = 0; i < steps; i++) {
    const stepValue = Math.round(startNum + stepSize * i)
    result.push(stepValue.toString())
  }
  return result
}

describe('interpolateArray.ts', () => {

  describe('dummyInterpolation', () => {

    const dummySteps = 5
    const actual = dummyInterpolation('0', '8', dummySteps)

    it('should return an array of 5 elements', () => {
      expect(actual).toHaveLength(dummySteps)
    })

    it('should return an array of 5 elements', () => {
      expect(actual).toStrictEqual(['0', '2', '4', '6', '8'])
    })
  })

  describe('splitIntoParts', () => {

    it('should split empty array', () => {
      const actual = splitIntoParts(['', '', ''])

      expect(actual).toStrictEqual([])
    })

    it('should split single item', () => {
      const actual = splitIntoParts(['', '80', ''])

      expect(actual).toStrictEqual([
        { start: 1, end: 1, startValue: '80', endValue: '80' },
      ])
    })

    it('should return parts when all provided', () => {
      const actual = splitIntoParts(['0', '70', '80'])

      expect(actual).toStrictEqual([
        { start: 0, end: 1, startValue: '0', endValue: '70' },
        { start: 1, end: 2, startValue: '70', endValue: '80' },
        { start: 2, end: 0, startValue: '80', endValue: '0' }
      ])
    })

    it('should split simple array into parts', () => {
      const actual = splitIntoParts(['0', '', '70', '', '80'])

      expect(actual).toStrictEqual([
        { start: 0, end: 2, startValue: '0', endValue: '70' },
        { start: 2, end: 4, startValue: '70', endValue: '80' },
        { start: 4, end: 0, startValue: '80', endValue: '0' }
      ])
    })

    it('should split array into parts when values inside', () => {
      const actual = splitIntoParts(['', '70', '', '80', ''])

      expect(actual).toStrictEqual([
        { start: 1, end: 3, startValue: '70', endValue: '80' },
        { start: 3, end: 1, startValue: '80', endValue: '70' },
      ])
    })
  })

  describe('interpolateArray', () => {

    it('should interpolate without values', () => {
      const actual = interpolateArray(['', ''], dummyInterpolation)

      expect(actual).toEqual([undefined, undefined])
    })

    it('should interpolate single item', () => {
      const actual = interpolateArray(['', '', '33'], dummyInterpolation)

      expect(actual).toStrictEqual(['33', '33', '33'])
    })

    it('should interpolate simple array', () => {
      const actual = interpolateArray(['0', '', '16'], dummyInterpolation)

      expect(actual).toStrictEqual(['0', '8', '16'])
    })

    it('should interpolate simple long array', () => {
      const actual = interpolateArray(['0', '', '', '', '8'], dummyInterpolation)

      expect(actual).toStrictEqual(['0', '2', '4', '6', '8'])
    })

    it('should interpolate array with two fixed items', () => {
      const actual = interpolateArray(['0', '', '70', '', '80'], dummyInterpolation)

      expect(actual).toStrictEqual(['0', '35', '70', '75', '80'])
    })

    it('should interpolate array with missing items at the start', () => {
      const actual = interpolateArray(['', '0', '', '80'], dummyInterpolation)

      expect(actual).toStrictEqual(['40', '0', '40', '80'])
    })
  })
})
