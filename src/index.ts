import './styles.css';
import { initializeChart } from './chart';

const rootElement = document.getElementById('root');
if (rootElement) {
  console.info('Root element found:', rootElement);
}

// Initialize the chart
const canvasElement = document.getElementById('myChart') as HTMLCanvasElement;
if (canvasElement) {
  initializeChart(canvasElement);
  console.info('Chart initialized');
}
