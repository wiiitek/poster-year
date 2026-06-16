
/**
 * Defines the type for the interpolation function used in the Interpolated Colors Plugin.
 * 
 * This function calculates intermediate values into an array
 * with first element as startValue and last element as endValue,
 * with a total length of steps.
 */
export type InterpolationFunction = (startValue: string, endValue: string, steps: number) => string[];
