import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  ChartConfiguration,
  Plugin,
} from 'chart.js';
import { chartData } from './chartData';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

// Custom plugin to draw rotated labels inside the chart
const rotatedLabelsPlugin: Plugin<'doughnut'> = {
  id: 'rotatedLabels',
  afterDatasetsDraw(chart) {
    const ctx = chart.ctx;
    const datasets = chart.config.data.datasets;

    datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      
      meta.data.forEach((arc: any, index) => {
        const { x, y, startAngle, endAngle, innerRadius, outerRadius } = arc;
        const middleAngle = (startAngle + endAngle) / 2;
        const radius = (innerRadius + outerRadius) / 2;
        
        // Calculate position for label
        const labelX = x + Math.cos(middleAngle) * radius;
        const labelY = y + Math.sin(middleAngle) * radius;
        
        // Get label text
        const label = chart.config.data.labels?.[index] as string;
        
        ctx.save();
        ctx.translate(labelX, labelY);
        
        // Rotate text to align with the arc
        // For outer dataset (months), rotate text along the arc
        if (datasetIndex === 1) {
          // Calculate rotation angle to align with arc
          // Angle is perpendicular to the radial direction
          let rotationAngle = middleAngle + Math.PI / 2;
          
          // Keep text readable - flip if it's on the left side of the chart
          // Left side is when angle is between π/2 and 3π/2 (90° to 270°)
          if (middleAngle > Math.PI / 2 && middleAngle < (3 * Math.PI) / 2) {
            rotationAngle += Math.PI;
          }
          
          ctx.rotate(rotationAngle);
        }
        
        // Set text style
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        if (datasetIndex === 0) {
          // Inner dataset (seasons) - larger font
          ctx.font = 'bold 18px Arial';
          ctx.fillStyle = '#000';
        } else {
          // Outer dataset (months) - smaller font
          ctx.font = 'bold 13px Arial';
          ctx.fillStyle = '#000';
        }
        
        ctx.fillText(label, 0, 0);
        ctx.restore();
      });
    });
  },
};

export function initializeChart(canvasElement: HTMLCanvasElement): Chart {
  // Prepare data for inner ring (seasons)
  const seasonLabels = chartData.map((season) => season.season);
  const seasonValues = chartData.map((season) =>
    season.months.reduce((sum, month) => sum + month.value, 0)
  );
  const seasonColors = chartData.map((season) => season.color);

  // Prepare data for outer ring (months)
  const monthLabels: string[] = [];
  const monthValues: number[] = [];
  const monthColors: string[] = [];

  chartData.forEach((season) => {
    season.months.forEach((month) => {
      monthLabels.push(month.label);
      monthValues.push(month.value);
      monthColors.push(month.color);
    });
  });

  const config: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: [...seasonLabels, ...monthLabels],
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
              const label = context.label || '';
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
