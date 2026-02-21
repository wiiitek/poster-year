# Requirements for gradientColorsPlugin

## Purpose
The plugin calculates gradient colors for Chart.js datapoints based on partial color specifications. It does not interact with chart rendering, only computes and assigns a `gradientColor` property to datapoints.

## Key Requirements

1. **Supported Color Format**: Only hex colors with transparency (e.g., #23A3F088) are accepted for now.
2. **Gradient Type**: Linear interpolation between provided colors, with wrap-around (last to first). Suitable for circular charts (e.g., doughnut).
3. **Interpolation Space**: RGBA color space. Interpolation logic must be isolated for easy replacement.
4. **Single Color Provided**: If only one color is specified, all datapoints use that color.
5. **Multiple Colors & Nested Data**:
   1. Interpolate between each pair of consecutive provided colors.
   2. Nested series (e.g., Winter → December, January, February):
     - Parent color is set for the parent (e.g., Winter).
     - Child datapoints (months) interpolate between adjacent parent colors (e.g., Autumn → Winter → Spring).
     - Interpolation is weighted by datapoint value (e.g., number of days in month).
6. **Color Mapping**: Specified colors are always mapped directly to datapoints.
9. **Input Source**: The plugin reads input colors directly from datapoints.
10. **Behaviour**:
    - while only some datapoints can have colors, the plugin calculates `gradientColor` for all based on provided colors.
    - if no colors are specified, the plugin makes all datapoint transparent.
