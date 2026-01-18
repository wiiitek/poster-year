import { Chart, Plugin } from 'chart.js'
import i18n from 'i18next';

import { configureI18N } from '../../configureI18N'
import { Label } from '../chartLabels';

type I18N = typeof i18n;

/**
 * Custom Chart.js plugin for labels translation
 */
export const translatedLabelsPlugin: Plugin<'doughnut'> = {
  id: 'translatedLabels',

  async afterInit(chart: Chart<"doughnut", number[], Label[]>) {

    configureI18N();
    i18n.on("initialized", () => {

      translateLabels(i18n, chart);

      // Add event listener for language change
      document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'L') {
          const languages = i18n.languages;
          const currentLanguage = i18n.language;
          const index = languages.indexOf(currentLanguage);
          const nextIndex = (index + 1) % languages.length;
          const nextLanguage = languages[nextIndex];
          console.info(`Switching language from ${currentLanguage} to ${nextLanguage}`);
          i18n.changeLanguage(nextLanguage);

          translateLabels(i18n, chart);
        }
      })
    });
  }
}

const translateLabels = (i18n: I18N, chart: Chart<"doughnut", number[], Label[]>) => {
  const currentLanguage = i18n.language
  console.info(`i18n initialized, current language: ${currentLanguage}`)
  // updates data and replace month names with correct localized names
  const monthValues: Label[] = chart.data.labels?.[0] || [];
  const translatedMonths = monthValues.map(label => ({ key: label.key, translation: i18n.t(label.key) }));
  const seasonValues: Label[] = chart.data.labels?.[1] || [];
  const translatedSeasons = seasonValues.map(label => ({ key: label.key, translation: i18n.t(label.key) }));
  chart.data.labels = [translatedMonths, translatedSeasons];
  chart.update();
}
