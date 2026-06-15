import { describe, it, expect } from 'vitest'
import { calculateInterpolatedColors } from './gradientColors'

describe('gradientColors', () => {

  describe('calculateGradientColors', () => {

    // https://onlinepngtools.com/step-between-two-colors
    it.each`
      startColor    |      endColor | steps | expected
      ${'12345678'} | ${'88888888'} |  ${1} | ${['12345678']}
      ${'00000000'} | ${'FFFFFFFF'} |  ${2} | ${['00000000', 'FFFFFFFF']}
      ${'00000000'} | ${'22222222'} |  ${3} | ${['00000000', '11111111', '22222222']}
      ${'23B1AC00'} | ${'8B008B64'} |  ${4} | ${['23B1AC00', '4676A121', '683B9643', '8B008B64']}
     `('should ', ({ startColor, endColor, steps, expected }) => {

      const actual = calculateInterpolatedColors(startColor, endColor, steps)

      expect(actual).toStrictEqual(expected)
    })
  })
})
