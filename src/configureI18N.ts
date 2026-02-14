import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

export function configureI18N(): void {
    i18n
        .use(HttpBackend)
        .use(LanguageDetector)
        .init({
            debug: true,
            fallbackLng: "en",
            backend: {
                loadPath: "./i18n/{{lng}}.json"
            }
        })
}
