import i18next from 'i18next';
import burmese from './burmese.json'
import chin from './chin.json'

import { initReactI18next } from "react-i18next";
i18next

  .use(initReactI18next)

  .init({
    fallbackLng: "en",
    lng: 'en', // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      br: burmese,
      cn: chin
    }
  });
export default i18next