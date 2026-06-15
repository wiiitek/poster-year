
export function splitIntoParts(input: (string | null)[]): (string | null)[][] {
    const parts: (string | null)[][] = []

    const nonNullItemsAt = []
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== null) {
            nonNullItemsAt.push(i)
        }
    }
    for (let i = 0; i < nonNullItemsAt.length - 1; i++) {
        const start = nonNullItemsAt[i]
        const end = nonNullItemsAt[i + 1]
        parts.push(input.slice(start, end + 1))
    }

    return parts
}

export function interpolateArray(
    input: (string | null)[],
    interpolation: (start: string, end: string, steps: number) => string[]
): string[] {
    return interpolation(input[0]!!, input[input.length - 1]!!, input.length)
}
