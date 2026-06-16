import { InterpolationFunction } from "./InterpolationFunction"

const COLOR_PATTERN = /^[0-9a-fA-F]{6}$/

function splitColor(color: string): { r: number, g: number, b: number } {
  const normalized = color.startsWith('#') ? color.slice(1) : color
  const isColor = COLOR_PATTERN.test(normalized)
  if (!isColor) {
    throw new Error(`Invalid hex color: "${color}"`)
  }
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  }
}

function calculateForSteps(startColor: string, endColor: string, steps: number): string[] {
  const start = splitColor(startColor)
  const end = splitColor(endColor)

  const result: string[] = []
  for (let i = 0; i < steps; i++) {
    const r = Math.round(start.r + (end.r - start.r) * i / (steps - 1))
    const g = Math.round(start.g + (end.g - start.g) * i / (steps - 1))
    const b = Math.round(start.b + (end.b - start.b) * i / (steps - 1))

    const stepColor =
      r.toString(16).padStart(2, '0') +
      g.toString(16).padStart(2, '0') +
      b.toString(16).padStart(2, '0')

    result.push(`#${stepColor.toUpperCase()}`)
  }

  return result
}

export const interpolateColors: InterpolationFunction = (startColor: string, endColor: string, steps: number): string[] => {
  if (steps < 0) {
    throw new Error('Steps must not be negative.')
  } else if (steps === 0) {
    return []
  } else if (steps === 1) {
    return [startColor]
  } else {
    return calculateForSteps(startColor, endColor, steps)
  }
}
