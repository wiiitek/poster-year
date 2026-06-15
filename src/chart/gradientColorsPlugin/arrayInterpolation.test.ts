import { describe, it, expect } from 'vitest'
import { interpolateArray, splitIntoParts } from './arrayInterpolation'

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

    describe('splitIntoParts', () => {

        it('should split array into parts', () => {
            const actual = splitIntoParts(['0', null, '70', null, '80'])

            expect(actual).toStrictEqual([['0', null, '70'], ['70', null, '80']])
        })
    })

    describe('interpolateArray', () => {

        it('should interpolate simple array', () => {
            const actual = interpolateArray(['0', null, null, null, '8'], dummyInterpolation)

            expect(actual).toStrictEqual(['0', '2', '4', '6', '8'])
        })

        it('should interpolate array with two fixed items', () => {
            const actual = interpolateArray(['0', null, '70', null, '80'], dummyInterpolation)

            expect(actual).toStrictEqual(['0', '35', '70', '75', '80'])
        })
    })
})
