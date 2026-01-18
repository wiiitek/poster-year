import i18n, { TFunction } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from "i18next-http-backend";

import en from "./i18n/en.json";
import de from "./i18n/de.json";
import pl from "./i18n/pl.json";


export function configureI18N(): void {
    i18n
        .use(HttpBackend)
        .use(LanguageDetector)
        .init({
            debug: true,
            fallbackLng: "en",
            backend: {
                loadPath: "/i18n/{{lng}}/translation.json"
            }
        })
}
