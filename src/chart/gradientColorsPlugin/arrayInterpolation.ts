
export interface Part {
  start: number
  end: number
  startValue: string
  endValue: string
}

export function splitIntoParts(input: (string | null)[]): Part[] {
  const parts: Part[] = []

  const nonNullItemsAt: number[] = []
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== null) {
      nonNullItemsAt.push(i)
    }
  }
  for (let i = 0; i < nonNullItemsAt.length - 1; i++) {
    const start = nonNullItemsAt[i]
    const end = nonNullItemsAt[i + 1]
    const startValue = input[start]!!
    const endValue = input[end]!!
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

export function interpolateArray(
  input: (string | null)[],
  interpolation: (start: string, end: string, steps: number) => string[]
): string[] {
  let steps: number = -1
  const parts: Part[] = splitIntoParts(input)
  const result: string[] = new Array(input.length)

  for (const part of parts) {
    const increase = part.start < part.end
    if (increase) {
      steps = part.end - part.start + 1
    } else {
      steps = input.length - part.start + part.end + 1
    }

    const interpolatedPart = interpolation(part.startValue, part.endValue, steps)

    for (let i = 0; i < interpolatedPart.length; i++) {
      const index = (part.start + i) % input.length
      result[index] = interpolatedPart[i]
    }
  }

  return result
}
