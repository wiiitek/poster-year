import { describe, it, expect } from 'vitest'
import { interpolateColors } from './interpolateColors'

describe('interpolateColors.ts', () => {

  describe('interpolateColors', () => {

    // https://onlinepngtools.com/step-between-two-colors
    it.each`
      startColor     |       endColor | steps | expected
      ${'#123456'} | ${'#888888'} |  ${1} | ${['#123456']}
      ${'#000000'} | ${'#FFFFFF'} |  ${2} | ${['#000000', '#FFFFFF']}
      ${'#000000'} | ${'#222222'} |  ${3} | ${['#000000', '#111111', '#222222']}
      ${'#23B1AC'} | ${'#8B008B'} |  ${4} | ${['#23B1AC', '#4676A1', '#683B96', '#8B008B']}
    `('interpolates $steps step(s) from $startColor to $endColor', ({ startColor, endColor, steps, expected }) => {

      const actual: string[] = interpolateColors(startColor, endColor, steps)

      expect(actual).toStrictEqual(expected)
    })
  })
})
