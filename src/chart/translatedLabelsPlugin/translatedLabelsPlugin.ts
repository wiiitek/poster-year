import { Chart, Plugin } from 'chart.js'
import i18n from 'i18next';

import { configureI18N } from '../../configureI18N'
/**
 * Custom Chart.js plugin for labels translation
 */
export const translatedLabelsPlugin: Plugin<'doughnut'> = {
  id: 'translatedLabels',

  async afterInit(chart: Chart<"doughnut", number[], string[]>, args, options) {

    configureI18N();
    i18n.on("initialized", () => {
      const currentLanguage = i18n.language
      console.info(`i18n initialized, current language: ${currentLanguage}`)
      // updates data and replace month names with correct localized names
      const monthValues: string[] = chart.data.labels?.[0] || [];
      const translatedMonths = monthValues.map(value => i18n.t(value));
      const seasonValues: string[] = chart.data.labels?.[1] || [];
      const translatedSeasons = seasonValues.map(value => i18n.t(value));
      chart.data.labels = [translatedMonths, translatedSeasons];
      chart.update();
    });
  }
}
