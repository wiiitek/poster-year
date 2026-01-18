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
  const seasonLabels = seasons.map(s => ({ key: s.label, translation: s.label }))
  const seasonValues = seasons.map(s => s.value)
  const seasonColors = seasons.map(s => s.color)

  const monthLabels = months.map(m => ({ key: m.label, translation: m.label }))
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
            // by default the title is taken from labels, but we have multilabels so we override it to be correct
            title: function (tooltipItems: TooltipItem<"doughnut">[]): string {
              const tooltipItem = tooltipItems[0];
              return tooltipItem.dataset.label || ''
            },
            label: function (context: TooltipItem<"doughnut">): string {
              const multiLabels = context.chart.data.labels
              const seriesLabels = multiLabels ? multiLabels[context.datasetIndex] as Label[] : []
              const label = seriesLabels[context.dataIndex]?.translation || ''
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
