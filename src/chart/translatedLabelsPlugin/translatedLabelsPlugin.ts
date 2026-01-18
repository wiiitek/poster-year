import { Plugin } from 'chart.js'
import i18n from 'i18next';

import { configureI18N } from '../../configureI18N'
/**
 * Custom Chart.js plugin for labels translation
 */
export const translatedLabelsPlugin: Plugin<'doughnut'> = {
  id: 'translatedLabels',

  async afterInit(chart, args, options) {

    configureI18N();
    i18n.on("initialized", () => {
      document.getElementById("greeting")!.innerText =
        i18n.t("hello", { name: "Jakub" });
    });

  }
}
