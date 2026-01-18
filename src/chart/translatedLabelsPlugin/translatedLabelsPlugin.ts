import { Chart, Plugin } from 'chart.js'
import i18n from 'i18next';

import { configureI18N } from '../../configureI18N'
/**
 * Custom Chart.js plugin for labels translation
 */
export const translatedLabelsPlugin: Plugin<'doughnut'> = {
  id: 'translatedLabels',

  async afterInit(chart: Chart<"doughnut", number[], string>, args, options) {

    configureI18N();
    i18n.on("initialized", () => {
      const currentLanguage = i18n.language
      console.info(`i18n initialized, current language: ${currentLanguage}`)
      // update dataset and replace month names with correct localized names
      chart.data.labels = chart.data.labels?.map(label => i18n.t(label)) || []
      chart.update();
    });

  }
}
