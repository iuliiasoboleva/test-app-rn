import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ru from './locales/ru.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    lng: 'en', // можно переключать вручную: 'ru' или 'en'
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
