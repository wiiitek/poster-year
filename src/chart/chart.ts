import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  ChartConfiguration,
} from 'chart.js';
import { seasons, months } from './chartData';
import { rotatedLabelsPlugin } from './rotatedLabelsPlugin';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export function initializeChart(canvasElement: HTMLCanvasElement): Chart {
  // Extract data directly from flat arrays
  const seasonLabels = seasons.map(s => s.label);
  const seasonValues = seasons.map(s => s.value);
  const seasonColors = seasons.map(s => s.color);
  
  const monthLabels = months.map(m => m.label);
  const monthValues = months.map(m => m.value);
  const monthColors = months.map(m => m.color);

  const config: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: seasonLabels,
      datasets: [
        {
          label: 'Seasons',
          data: seasonValues,
          backgroundColor: seasonColors,
          borderWidth: 2,
          borderColor: '#fff',
          weight: 1,
        },
        {
          label: 'Months',
          data: monthValues,
          backgroundColor: monthColors,
          borderWidth: 2,
          borderColor: '#fff',
          weight: 1.5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false, // Hide legend since we have labels on chart
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function (context) {
              let label = '';
              if (context.datasetIndex === 0) {
                // Season tooltip
                label = seasonLabels[context.dataIndex];
              } else {
                // Month tooltip
                label = monthLabels[context.dataIndex];
              }
              const value = context.parsed || 0;
              return `${label}: ${value} days`;
            },
          },
        },
      },
      layout: {
        padding: 20,
      },
    },
    plugins: [rotatedLabelsPlugin],
  };

  return new Chart(canvasElement, config);
}
