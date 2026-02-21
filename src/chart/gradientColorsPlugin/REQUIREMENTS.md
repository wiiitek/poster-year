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
   2. Nested series (e.g. seasons and months) are independent
6. **Input Source**: The plugin reads input colors directly from datapoints.
7. **Color Mapping**: Gradient colors are always mapped directly to datapoints.
8. **Behaviour**:
   - while only some datapoints can have colors, the plugin calculates `gradientColor` for the rest.
   - if no colors are specified, the plugin makes all datapoint transparent.

## Algorithm

The algorithm calculates missing colors in a flat array, interpolating between provided colors and wrapping from the last to the first. It works as follows:

1. Identify indices of datapoints with provided colors.
2. For each segment between two provided colors (including wrap-around from last to first):
   - Interpolate missing colors evenly between the two endpoints.
   - If a color does not include transparency, assume alpha = 255 (fully opaque).
3. If only one color is provided, fill all datapoints with that color.
4. If no colors are provided, fill all datapoints with transparent white (#FFFFFF00).
5. Parent and child levels are processed separately; the algorithm applies to a single flat series.

### Pseudo code

```
function calculateGradientColors(datapoints):
   n = length of datapoints
   colorIndices = indices where datapoints[i].color is defined
   if colorIndices.length == 0:
      for i in 0..n-1:
         datapoints[i].gradientColor = '#FFFFFF00' // transparent white
      return
   if colorIndices.length == 1:
      for i in 0..n-1:
         datapoints[i].gradientColor = datapoints[colorIndices[0]].color
      return
   for each segment (start, end) in colorIndices (wrap last to first):
      startColor = parseColor(datapoints[start].color)
      endColor = parseColor(datapoints[end].color)
      // calculates segment length even if wrapped from last to first
      segmentLength = ABS[(end - start + n) % n]
      for j in 1..segmentLength-1:
         t = j / segmentLength
         interpolatedColor = interpolateColor(startColor, endColor, t)
         datapoints[(start + j) % n].gradientColor = interpolatedColor
   // and copy provided colors as gradient colors
   for i in colorIndices:
      datapoints[i].gradientColor = datapoints[i].color
```

*parseColor* converts hex to RGBA, defaulting alpha to 255 if not specified.
*interpolateColor* linearly interpolates RGBA values.
