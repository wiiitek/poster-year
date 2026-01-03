import { Plugin, ArcElement } from 'chart.js';
import { seasons, months } from './chartData';

// Interface for chart data item
export interface ChartDataItem {
  label: string;
  value: number;
  color: string;
}

// Extended ArcElement properties with position coordinates
export interface ArcProps {
  x: number;
  y: number;
  startAngle: number;
  endAngle: number;
  innerRadius: number;
  outerRadius: number;
}

// Custom plugin to draw rotated labels inside the chart
export const rotatedLabelsPlugin: Plugin<'doughnut'> = {
  id: 'rotatedLabels',
  afterDatasetsDraw(chart) {
    const ctx = chart.ctx;
    const datasets = chart.config.data.datasets;

    datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      
      meta.data.forEach((element, index) => {
        const arc = element as unknown as ArcProps;
        
        const { x, y, startAngle, endAngle, innerRadius, outerRadius } = arc;
        const middleAngle = (startAngle + endAngle) / 2;
        const radius = (innerRadius + outerRadius) / 2;
        
        // Calculate position for label
        const labelX = x + Math.cos(middleAngle) * radius;
        const labelY = y + Math.sin(middleAngle) * radius;
        
        // Get label text from the dataset's data
        let label = '';
        if (datasetIndex === 0) {
          // Inner dataset (seasons)
          label = seasons[index].label;
        } else {
          // Outer dataset (months)
          label = months[index].label;
        }
        
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