import { describe, it, expect } from 'vitest'
import { interpolateArray } from './arrayInterpolation'

function dummyInterpolation(start: string, end: string, steps: number): string[] {
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

describe('arrayInterpolation', () => {

    describe('dummyInterpolation', () => {

        const actual = dummyInterpolation('0', '8', 5)

        it('should return an array of 5 elements', () => {
            expect(actual).toHaveLength(5)
        })

        it('should return an array of 5 elements', () => {
            expect(actual).toStrictEqual(['0', '2', '4', '6', '8'])
        })
    })

    describe('interpolateArray', () => {
        it('should return an empty array', () => {
            
            const actual = interpolateArray(['0', '8'], dummyInterpolation)

            expect(actual).toStrictEqual(['0', '2', '4', '6', '8'])
        })
    })
})
