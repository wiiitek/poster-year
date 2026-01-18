import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  ChartConfiguration,
  TooltipItem,
} from 'chart.js'
import { seasons, months } from './chartData'
import { rotatedLabelsPlugin } from './rotatedLabelsPlugin/rotatedLabelsPlugin'
import { translatedLabelsPlugin } from './translatedLabelsPlugin/translatedLabelsPlugin'
import { Label } from './chartLabels'

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

export function initializeChart(canvasElement: HTMLCanvasElement): Chart<"doughnut", number[], Label[]> {
  // Extract data directly from flat arrays
  const seasonLabels = seasons.map(s => ({key: s.label, translation: s.label}))
  const seasonValues = seasons.map(s => s.value)
  const seasonColors = seasons.map(s => s.color)

  const monthLabels = months.map(m => ({key: m.label, translation: m.label}))
  const monthValues = months.map(m => m.value)
  const monthColors = months.map(m => m.color)

  const config: ChartConfiguration<"doughnut", number[], Label[]> = {
    type: 'doughnut',
    data: {
      // array of arrays: we need multilabels here to have array for each series of data
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
            // TODO: fix tooltips to show translated labels
            label: function (context: TooltipItem<"doughnut">): string {
              let label = ''
              if (context.datasetIndex === 0) {
                // Month tooltip
                const monthLabels = context.chart.data.labels?.[0] || []
                // label = monthLabels ? monthLabels[context.dataIndex]?.translation || '' : ''
                // label = ?.[context.dataIndex]?.translation || ''
                // label = monthLabels[context.dataIndex]
                label = 'Month'
              } else {
                // Season tooltip
                // label = seasonLabels[context.dataIndex]
                label = 'Season'
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

  return new Chart<"doughnut", number[], Label[]>(canvasElement, config)
}
