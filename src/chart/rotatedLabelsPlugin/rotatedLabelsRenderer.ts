import { ArcElement, Element } from 'chart.js'

import { Label } from '../chartLabels'
import { calculateLabelPosition, LabelPosition } from './rotatedLabelsPosition'
import { calculateTextRotationAngle } from './rotatedLabelsRotation'
import { createLabelConfiguration, LabelConfiguration } from './rotatedLabelsTextAndStyle'

interface ArcElementWithPosition extends ArcElement {
  x: number;
  y: number;
  startAngle: number;
  endAngle: number;
  innerRadius: number;
  outerRadius: number;
}

export function renderDatasetLabels(
  multiLabels: Label[][],
  context: CanvasRenderingContext2D,
  datasetIndex: number,
  elements: Element[]
): void {
  elements.forEach((element, elementIndex) => {
    const arcElement = element as unknown as ArcElementWithPosition
    const labelConfiguration = createLabelConfiguration(multiLabels, datasetIndex, elementIndex)

    renderLabel(context, datasetIndex, arcElement, labelConfiguration)
  })
}

function renderLabel(
  context: CanvasRenderingContext2D,
  datasetIndex: number,
  arcElement: ArcElementWithPosition,
  configuration: LabelConfiguration
): void {
  if (!configuration.text) {
    return
  }

  const middleAngle = (arcElement.startAngle + arcElement.endAngle) / 2
  const middleRadius = (arcElement.innerRadius + arcElement.outerRadius) / 2

  const labelPosition: LabelPosition = calculateLabelPosition(arcElement.x, arcElement.y, middleAngle, middleRadius)

  context.save()
  context.translate(labelPosition.x, labelPosition.y)

  // only perpendicular index for the inner ring
  const perpendicular = datasetIndex == 1
  const rotationAngle = calculateTextRotationAngle(middleAngle, perpendicular)
  context.rotate(rotationAngle)

  applyTextStyling(context, configuration)
  context.fillText(configuration.text, 0, 0)
  context.restore()
}

function applyTextStyling(
  context: CanvasRenderingContext2D,
  configuration: LabelConfiguration
): void {
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.font = configuration.font
  context.fillStyle = configuration.color
}
