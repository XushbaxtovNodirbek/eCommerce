import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {storage} from '../store';
import resources from './resources';

i18n
  .use({
    type: 'languageDetector',
    async: true,
    detect: async (cb: (lng: string) => void) => {
      const lng = storage.getString('language') || 'uz';
      cb(lng);
    },
  })
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    compatibilityJSON: 'v3',
    fallbackLng: 'uz',
    defaultNS: 'main',
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
