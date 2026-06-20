import { describe, it, expect, vi } from 'vitest'

import { RotationCalculator, RotationCalculatorImpl } from './RotationCalculator'
import { ChartRotation } from './ChartRotation'

describe('RotationCalculator.ts', () => {

  const chartRotation: ChartRotation = {
    rotateChart: vi.fn(),
  }

  const tested: RotationCalculator = new RotationCalculatorImpl(500, 200, chartRotation)

  describe('onUpdate', () => {

    it('should not update the chart for same coordinates', () => {
      tested.onStart(500, 200)
      tested.onUpdate(600, 200)
      expect(chartRotation.rotateChart).not.toHaveBeenCalled()
    })

    it.each`
      startX | startY |   endX |   endY | description
      ${500} | ${200} | ${678} | ${345} | ${"starting from center"}
      ${123} | ${200} | ${456} | ${300} | ${"vertical movement in the middle of the chart"}
      ${500} | ${100} | ${500} | ${800} | ${"horizontal movement in the center of the chart"}
    `('should not update for same angle ($description)', ({ startX, startY, endX, endY, description }) => {
      tested.onStart(startX, startY)
      tested.onUpdate(endX, endY)
      expect(chartRotation.rotateChart).not.toHaveBeenCalled()
    })
  })
})
