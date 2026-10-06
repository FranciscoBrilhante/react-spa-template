import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export const SUPPORTED_LANGUAGES = ['en', 'pt'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

void i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: SUPPORTED_LANGUAGES,
        nonExplicitSupportedLngs: true,
        defaultNS: 'translation',
        ns: ['translation'],
        // Strings live in /public/locales/<lang>/translation.json and are fetched at runtime.
        backend: {
            loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/translation.json`,
            requestOptions: { cache: 'no-store' },
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
        interpolation: { escapeValue: false }, // React already escapes
        react: { useSuspense: true },
    });

i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng;
});

if (import.meta.hot) {
    import.meta.hot.on('locales-update', async () => {
        await i18n.reloadResources(); // re-fetch every loaded language/namespace
        await i18n.changeLanguage(i18n.language); // emits languageChanged so useTranslation re-renders
    });
}

export default i18n;
