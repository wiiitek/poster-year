import './styles.css'
import { initializeChart } from './chart/chart'

const rootElement = document.getElementById('root')
if (rootElement) {
  console.info('Root element found:', rootElement)
}

// Initialize the chart
const canvasElement = document.getElementById('myChart') as HTMLCanvasElement
if (canvasElement) {
  const chart = initializeChart(canvasElement)
  console.info('Chart initialized')

  var rotationDegrees = 0

  // Add event listener for keypress events
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === '[') {
      rotationDegrees -= 6
      chart.options.rotation = rotationDegrees
      chart.update()
    } else if (event.key === ']') {
      rotationDegrees += 6
      chart.options.rotation = rotationDegrees
      chart.update()
    }
  })
}
