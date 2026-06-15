interface Part {
  start: number
  end: number
  startValue: string
  endValue: string
}

function oneItemOnly(nonNullItemsAt: number, value: string): Part[] {
  return [{
    start: nonNullItemsAt,
    end: nonNullItemsAt,
    startValue: value,
    endValue: value,
  }]
}

function splitIntoMoreThanOneParts(input: (string | null)[], nonNullItemsAt: number[]): Part[] {
  const parts: Part[] = []
  for (let i = 0; i < nonNullItemsAt.length - 1; i++) {
    const start = nonNullItemsAt[i]
    const end = nonNullItemsAt[i + 1]
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

export function splitIntoParts(input: (string | null)[]): Part[] {

  const nonNullItemsAt: number[] = []
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== null) {
      nonNullItemsAt.push(i)
    }
  }

  switch (nonNullItemsAt.length) {
    case 0:
      return []
    case 1:
      return oneItemOnly(nonNullItemsAt[0], input[nonNullItemsAt[0]]!)
    default:
      return splitIntoMoreThanOneParts(input, nonNullItemsAt)
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

export function interpolateArray(
  input: (string | null)[],
  interpolation: (start: string, end: string, steps: number) => string[]
): (string | undefined)[] {
  const parts: Part[] = splitIntoParts(input)
  const result: (string | undefined)[] = new Array(input.length).fill(undefined)

  for (const part of parts) {
    const steps = howManySteps(part.start, part.end, input.length)
    const interpolatedPart = interpolation(part.startValue, part.endValue, steps)
    for (let i = 0; i < interpolatedPart.length; i++) {
      const index = (part.start + i) % input.length
      result[index] = interpolatedPart[i]
    }
  }

  return result
}
