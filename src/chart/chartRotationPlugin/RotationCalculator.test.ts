import { describe, it, expect, vi, beforeEach } from 'vitest'

import { RotationCalculator, RotationCalculatorImpl } from './RotationCalculator'
import { RotationIntegration } from './RotationIntegration'

describe('RotationCalculator.ts', () => {

  const rotationIntegration: RotationIntegration = {
    rotateChart: vi.fn(),
  }

  let tested: RotationCalculator

  beforeEach(() => {
    vi.clearAllMocks()
    tested = new RotationCalculatorImpl(500, 200, rotationIntegration)
  })

  describe('calculateAngle', () => {

    it.each`
      x      | y      |   expected | DIRECTION
      ${600} | ${200} |       ${0} | ${"EAST"}
      ${500} | ${100} |     ${-90} | ${"NORTH"}
      ${500} | ${300} |      ${90} | ${"SOUTH"}
      ${400} | ${200} |     ${180} | ${"WEST"}
      ${400} | ${201} | ${179.427} | ${"BELOW-WEST"}
      ${400} | ${199} |${-179.427} | ${"ABOVE-WEST"}
    `('should calculate correct angle for $DIRECTION', ({ x, y, expected }) => {

      const actual = tested.calculateAngle(x, y)
      expect(actual).toBeCloseTo(expected)
    })

    it('should calculate angle for NORTH-WEST', () => {
      const angle = tested.calculateAngle(400, 100)
      expect(angle).toBeCloseTo(-135)
    })

    it('should calculate small angle changes accurately', () => {
      const angle = tested.calculateAngle(602, 195)
      const angleAbs = Math.abs(angle)
      expect(angleAbs).toBeLessThan(3)
    })
  })

  describe('onUpdate', () => {

    it.each`
      startX | startY |   endX |   endY | description
      ${500} | ${200} | ${500} | ${200} | ${"stay in center"}
      ${123} | ${456} | ${123} | ${456} | ${"stay in same point"}
      ${123} | ${200} | ${456} | ${200} | ${"vertical movement in the middle of the chart"}
    `('should not update for same angle ($description)', ({ startX, startY, endX, endY, description }) => {
      tested.onStart(startX, startY)
      tested.onUpdate(endX, endY)
      expect(rotationIntegration.rotateChart).not.toHaveBeenCalled()
    })

    it.each`
      startX | startY |   endX |   endY | expectedRotation
      ${500} | ${100} | ${600} | ${200} | ${90}
      ${600} | ${200} | ${500} | ${100} | ${-90}
      ${500} | ${100} | ${500} | ${300} | ${180}
    `('should rotate chart for angle: $expectedRotation', ({ startX, startY, endX, endY, expectedRotation }) => {
      tested.onStart(startX, startY)
      tested.onUpdate(endX, endY)
      expect(rotationIntegration.rotateChart).toHaveBeenCalledWith(expectedRotation)
    })

    it('should correctly recognize small rotation at the edge', () => {
      // when we rotate from below WEST to above WEST
      tested.onStart(400, 201)
      tested.onUpdate(400, 199)
      expect(rotationIntegration.rotateChart).toHaveBeenCalledWith(1.1458773953669947)
    })

    it('should correctly recognize small rotation at the edge', () => {
      // when we rotate from above WEST to below WEST
      tested.onStart(400, 199)
      tested.onUpdate(400, 201)
      expect(rotationIntegration.rotateChart).toHaveBeenCalledWith(-1.1458773953669947)
    })
  })
})
