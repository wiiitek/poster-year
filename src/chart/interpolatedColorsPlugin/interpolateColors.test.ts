import { describe, it, expect } from 'vitest'
import { interpolateColors } from './interpolateColors'

describe('interpolateColors.ts', () => {

  describe('interpolateColors', () => {

    // https://onlinepngtools.com/step-between-two-colors
    it.each`
      startColor    |      endColor | steps | expected
      ${'12345678'} | ${'88888888'} |  ${1} | ${['12345678']}
      ${'00000000'} | ${'FFFFFFFF'} |  ${2} | ${['00000000', 'FFFFFFFF']}
      ${'00000000'} | ${'22222222'} |  ${3} | ${['00000000', '11111111', '22222222']}
      ${'23B1AC00'} | ${'8B008B64'} |  ${4} | ${['23B1AC00', '4676A121', '683B9643', '8B008B64']}
    `('should ', ({ startColor, endColor, steps, expected }) => {

      const actual: string[] = interpolateColors(startColor, endColor, steps)

      expect(actual).toStrictEqual(expected)
    })
  })
})
