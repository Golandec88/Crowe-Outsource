import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import EN from "@public/locales/en.json";
import RU from "@public/locales/ru.json";

const resources = {
  en : {
    translation: EN
  },
  ru : {
    translation : RU
  }
};

i18n.use(initReactI18next).init({ resources, lng: "ru" });

export default i18n;
