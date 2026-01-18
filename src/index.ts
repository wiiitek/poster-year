import './styles.css'
import { initializeChart } from './chart/chart'

const rootElement = document.getElementById('root')
if (rootElement) {
  console.info('Root element found:', rootElement)
}

// Initialize the chart
const canvasElement = document.getElementById('myChart') as HTMLCanvasElement
if (canvasElement) {
  initializeChart(canvasElement)
  console.info('Chart initialized')


  // Add event listener for keypress events
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === '-') {
      console.log('Minus key (-) pressed')
    } else if (event.key === '=') {
      console.log('Equals key (=) pressed')
    }
  })
}
