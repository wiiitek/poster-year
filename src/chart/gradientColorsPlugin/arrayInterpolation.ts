
export function splitIntoParts(input: (string | null)[]): (string | number)[][] {
    const parts: (string | number)[][] = []

    

    return parts
}

export function interpolateArray(
    input: (string | null)[],
    interpolation: (start: string, end: string, steps: number) => string[]
): string[] {
    return interpolation(input[0]!!, input[input.length - 1]!!, input.length)
}
