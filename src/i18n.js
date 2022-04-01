import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "../public/locales/en/translation.json";
import translationRU from "../public/locales/ru/translation.json";


const resources = {

  en : {
    translation: translationEN
  },

  ru : {
    translation : translationRU
  }

};





i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ru",
    fallbackLng: "ru",
    debug: true,
    keySeparator: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;