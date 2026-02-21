# gradientColorsPlugin

This plugin for Chart.js will automatically generate gradient colors for dataset points where explicit colors are not provided. The plugin will interpolate colors between the provided ones, creating smooth transitions across the dataset. For example, if you specify black for 'summer' and white for 'winter', the plugin will calculate intermediate gray shades for 'spring' and 'autumn'.

## Features

1. Accepts partial color definitions for dataset points.
2. Calculates missing colors as a gradient between provided colors.
3. Applies the generated color array to the dataset before the chart is created.

## Usage

1. Add the plugin to your Chart.js configuration.
2. Specify colors for some data points in your dataset.
3. The plugin will fill in the rest with interpolated gradient colors.
4. For first step you can experiment with [complementary colors](https://giggster.com/guide/complementary-colors/)
