import { InterpolationFunction } from "./InterpolationFunction"

interface Part {
  start: number
  end: number
  startValue: string
  endValue: string
}

function oneItemOnly(nonEmptyItemIndex: number, value: string): Part[] {
  return [{
    start: nonEmptyItemIndex,
    end: nonEmptyItemIndex,
    startValue: value,
    endValue: value,
  }]
}

function splitIntoMoreThanOneParts(input: string[], nonEmptyItemsIndexes: number[]): Part[] {
  const parts: Part[] = []
  for (let i = 0; i < nonEmptyItemsIndexes.length - 1; i++) {
    const start = nonEmptyItemsIndexes[i]
    const end = nonEmptyItemsIndexes[i + 1]
    const startValue = input[start]!
    const endValue = input[end]!
    parts.push({ start, end, startValue, endValue })
  }
  // and adds additional part to close cycle
  const first = parts[0]
  const last = parts[parts.length - 1]
  const connectingPart = {
    start: last.end,
    end: first.start,
    startValue: last.endValue,
    endValue: first.startValue
  }
  parts.push(connectingPart)
  return parts
}

export function splitIntoParts(input: string[]): Part[] {
  // discovers indexes of non-empty values
  const nonEmptyItemsIndexes: number[] = []
  for (let i = 0; i < input.length; i++) {
    if (input[i]) {
      nonEmptyItemsIndexes.push(i)
    }
  }

  switch (nonEmptyItemsIndexes.length) {
    case 0:
      return []
    case 1:
      return oneItemOnly(nonEmptyItemsIndexes[0], input[nonEmptyItemsIndexes[0]]!)
    default:
      return splitIntoMoreThanOneParts(input, nonEmptyItemsIndexes)
  }
}

function howManySteps(start: number, end: number, inputLength: number): number {
  let steps: number
  const increase = start < end
  if (increase) {
    steps = end - start + 1
  } else {
    steps = inputLength - start + end + 1
  }
  return steps
}

/**
 * Interpolates an array of strings with empty values to be interpolated.
 * 
 * @param input array of strings with some empty values to be interpolated
 * @param interpolationFunction function used to interpolate between two values
 * @returns array of strings with interpolated values, for all inputs empty returns array of undefines.
 */
export function interpolateArray(
  input: string[],
  interpolationFunction: InterpolationFunction
): (string | undefined)[] {
  const parts: Part[] = splitIntoParts(input)
  const result: (string | undefined)[] = new Array(input.length).fill(undefined)

  for (const part of parts) {
    const steps = howManySteps(part.start, part.end, input.length)
    const interpolatedPart = interpolationFunction(part.startValue, part.endValue, steps)
    for (let i = 0; i < interpolatedPart.length; i++) {
      const index = (part.start + i) % input.length
      result[index] = interpolatedPart[i]
    }
  }

  return result
}
