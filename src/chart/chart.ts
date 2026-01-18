import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  ChartConfiguration,
} from 'chart.js'
import { seasons, months } from './chartData'
import { rotatedLabelsPlugin } from './rotatedLabelsPlugin/rotatedLabelsPlugin'
import { translatedLabelsPlugin } from './translatedLabelsPlugin/translatedLabelsPlugin'

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

export function initializeChart(canvasElement: HTMLCanvasElement): Chart<"doughnut", number[], string[]> {
  // Extract data directly from flat arrays
  const seasonLabels = seasons.map(s => s.label)
  const seasonValues = seasons.map(s => s.value)
  const seasonColors = seasons.map(s => s.color)

  const monthLabels = months.map(m => m.label)
  const monthValues = months.map(m => m.value)
  const monthColors = months.map(m => m.color)

  const config: ChartConfiguration<"doughnut", number[], string[]> = {
    type: 'doughnut',
    data: {
      labels: [monthLabels, seasonLabels],
      datasets: [
        // ordered from outermost to innermost
        {
          label: 'Months',
          data: monthValues,
          backgroundColor: monthColors,
          borderWidth: 2,
          borderColor: '#fff',
          weight: 5.0,
        },
        {
          label: 'Seasons',
          data: seasonValues,
          backgroundColor: seasonColors,
          borderWidth: 2,
          borderColor: '#fff',
          weight: 3.0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      // The portion of the chart that is cut out of the middle.
      cutout: '35%',
      plugins: {
        legend: {
          display: false, // Hide legend since we have labels on chart
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function (context) {
              let label = ''
              if (context.datasetIndex === 0) {
                // Month tooltip
                label = monthLabels[context.dataIndex]
              } else {
                // Season tooltip
                label = seasonLabels[context.dataIndex]
              }
              const value = context.parsed || 0
              return `${label}: ${value} days`
            },
          },
        },
      },
      layout: {
        padding: 20,
      },
    },
    plugins: [
      rotatedLabelsPlugin,
      translatedLabelsPlugin,
    ],
  }

  return new Chart<"doughnut", number[], string[]>(canvasElement, config)
}
