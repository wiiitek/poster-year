
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
    return interpolation(input[0]!!, input[input.length - 1]!!, input.length)
}
