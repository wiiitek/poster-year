# interpolatedColorsPlugin

The plugin will interpolate colors between the provided ones, creating smooth transitions.
For example, if you specify black for 'summer' and white for 'winter'
the plugin will calculate intermediate gray shades for 'spring' and 'autumn'.

## Algorithm

The algorithm calculates missing colors in a flat array,
interpolating between provided colors and wrapping from the last to the first.
It works as follows:

1. Identify indices of datapoints with provided colors.
2. For each segment between two provided colors (including wrap-around from last to first):
   - Interpolate missing colors evenly between those provided.
   - Apply generated color array to the dataset before the chart is created.

## Additional Notes

1. **Supported Color Format**: Only hex colors (e.g., #23A3F0) are accepted for now.
2. **Interpolation Type**: Linear interpolation between provided colors, with wrap-around (last to first).
3. **Single Color Provided**: If only one color is specified, all datapoints use that color.
4. **Input Source**: The plugin reads input colors directly from datapoints.
