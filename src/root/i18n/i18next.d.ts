import 'i18next'
import type translation from '../../public/locales/en/translation.json'

// The English file is the source of truth for the key types.
// `t('home.greeting', { name })` is autocompleted and errors on unknown keys.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: typeof translation
    }
  }
}
