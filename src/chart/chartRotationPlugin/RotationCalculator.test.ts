import { describe, it, expect, vi, beforeEach } from 'vitest'

import { RotationCalculator, RotationCalculatorImpl } from './RotationCalculator'
import { ChartRotation } from './ChartRotation'

describe('RotationCalculator.ts', () => {

  const chartRotation: ChartRotation = {
    rotateChart: vi.fn(),
  }

  const tested: RotationCalculator = new RotationCalculatorImpl(500, 200, chartRotation)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('calculateAngle', () => {

    it('should calculate 90° rotation (counter-clockwise) from right to top', () => {
      // Canvas center: (500, 200)
      // Start: (600, 200) - right of center → angle = 0°
      // End: (500, 100) - top of center → angle = 90°
      // Expected delta: 90°
      tested.onStart(600, 200)
      const angle = tested.calculateAngle(500, 100)
      expect(angle).toBeCloseTo(90)
    })

    it('should calculate -90° rotation (clockwise) from top to right', () => {
      // Canvas center: (500, 200)
      // Start: (500, 100) - top of center → angle = 90°
      // End: (600, 200) - right of center → angle = 0°
      // Expected delta: -90°
      tested.onStart(500, 100)
      const angle = tested.calculateAngle(600, 200)
      expect(angle).toBeCloseTo(-90, 1)
    })

    it('should calculate 180° rotation from top to bottom', () => {
      // Canvas center: (500, 200)
      // Start: (500, 100) - top of center → angle = 90°
      // End: (500, 300) - bottom of center → angle = -90° (or 270°)
      // Expected delta: -180° (or 180° depending on direction)
      tested.onStart(500, 100)
      const angle = tested.calculateAngle(500, 300)
      expect(Math.abs(angle)).toBeCloseTo(180, 1)
    })

    it('should calculate angle for 45° counter-clockwise rotation', () => {
      // Canvas center: (500, 200)
      // Start: (600, 200) - right of center → angle = 0°
      // End: approximately (571, 129) - 45° from center
      tested.onStart(600, 200)
      const angle = tested.calculateAngle(571, 129)
      expect(angle).toBeCloseTo(45, 0)
    })

    it('should handle rotations across the 0° boundary', () => {
      // Canvas center: (500, 200)
      // Start: (550, 150) - around -45° from center
      // End: (550, 250) - around 45° from center
      tested.onStart(550, 150)
      const angle = tested.calculateAngle(550, 250)
      expect(angle).toBeCloseTo(-90)
    })

    it('should calculate small angle changes accurately', () => {
      // Canvas center: (500, 200)
      // Start: (600, 200) - right of center
      // End: (602, 195) - very small rotation
      tested.onStart(600, 200)
      const angle = tested.calculateAngle(602, 195)
      expect(Math.abs(angle)).toBeLessThan(10)
    })
  })

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

    it.each`
      startX | startY |   endX |   endY | expectedRotation
      ${500} | ${100} | ${600} | ${200} | ${90}
      ${600} | ${200} | ${500} | ${100} | ${-90}
      ${500} | ${100} | ${500} | ${300} | ${180}
    `('should rotate chart for angle: $expectedRotation', ({ startX, startY, endX, endY, expectedRotation }) => {
      tested.onStart(startX, startY)
      tested.onUpdate(endX, endY)
      expect(chartRotation.rotateChart).toHaveBeenCalledWith(expectedRotation)
    })
  })
})
