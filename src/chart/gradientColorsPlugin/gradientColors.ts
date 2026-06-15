
function splitColor(color: string): { r: number, g: number, b: number, a: number } {
    return {
        r: parseInt(color.slice(0, 2), 16),
        g: parseInt(color.slice(2, 4), 16),
        b: parseInt(color.slice(4, 6), 16),
        a: parseInt(color.slice(6, 8), 16)
    }
}

export function calculateGradientColors(startColor: string, endColor: string, steps: number): string[] {
    const start = splitColor(startColor)
    const end = splitColor(endColor)

    const result: string[] = []
    for (let i = 0; i < steps; i++) {
        const r = Math.round(start.r + (end.r - start.r) * i / (steps - 1))
        const g = Math.round(start.g + (end.g - start.g) * i / (steps - 1))
        const b = Math.round(start.b + (end.b - start.b) * i / (steps - 1))
        const a = Math.round(start.a + (end.a - start.a) * i / (steps - 1))

        const stepColor =
            r.toString(16).padStart(2, '0') +
            g.toString(16).padStart(2, '0') +
            b.toString(16).padStart(2, '0') +
            a.toString(16).padStart(2, '0')

        result.push(stepColor.toUpperCase())
    }

    return result
}
