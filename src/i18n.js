import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationAR from './locale/ar.json';
import translationFR from './locale/fr.json';
import translationEN from './locale/en.json';

i18next
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'fr',
    resources: {
      ar: { translation: translationAR },
      fr: { translation: translationFR },
      en:{translation: translationEN }
    },
    react: {
      useSuspense: false
    }
  });

export default i18next;
