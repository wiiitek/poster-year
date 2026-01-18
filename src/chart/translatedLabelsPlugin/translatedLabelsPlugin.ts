import { Chart, Plugin } from 'chart.js'
import i18n from 'i18next'

import { configureI18N } from '../../configureI18N'
import { Label } from '../Label'

type I18N = typeof i18n;

interface TermKey {
  translationKey: string;
}

/**
 * Custom Chart.js plugin for labels translation
 */
export const translatedLabelsPlugin: Plugin<'doughnut'> = {
  id: 'translatedLabels',

  async afterInit(chart: Chart<"doughnut", number[], Label[]>) {

    configureI18N()
    i18n.on("initialized", () => {

      translateLabels(i18n, chart)
      const languages = ['en', 'de', 'pl']

      // Add event listener for language change
      document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'L') {
          const currentLanguage = i18n.language
          const index = languages.indexOf(currentLanguage)
          const nextIndex = (index + 1) % languages.length
          const nextLanguage = languages[nextIndex]
          i18n.changeLanguage(nextLanguage, (err) => {
            if (err) {
              console.error(`Failed to load language ${nextLanguage}:`, err)
              return
            }
            translateLabels(i18n, chart)
          })
        }
      })
    })
  }
}

const translateLabels = (i18n: I18N, chart: Chart<"doughnut", number[], Label[]>) => {
  // translate terms for datasets
  chart.data.datasets.forEach((dataset) => {
    const isParsingAnObject = typeof dataset.parsing === 'object'
    // Uses a map for dataset parsing to store our translationKey (see also chart dataset configuration)
    const key = isParsingAnObject ? (dataset.parsing as unknown as TermKey).translationKey : null
    const translatedTerm = key ? i18n.t(key) : ''
    dataset.label = translatedTerm
  })
  // translate over multi-labels
  const translatedMultiLabels: Label[][] = chart.data.labels!.map((labels: Label[]) => {
    return labels.map(label =>
      ({ key: label.key, translation: i18n.t(label.key) })
    )
  })
  chart.data.labels = translatedMultiLabels
  chart.update()
}
