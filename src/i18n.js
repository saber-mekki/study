import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationFR from "./locales/fr/translation.json";
import translationAR from "./locales/ar/translation.json";

import translationGR from "./locales/gr/translation.json";
import translationEN from "./locales/en/translation.json";

// the translations
const resources = {
    fr: {
        translation: translationFR,
    },
    gr: {
        translation: translationGR,
    },
    en: {
        translation: translationEN,
    },
    ar: {
        translation: translationAR,
    },
};

i18n.use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng:[ "en","gr","ar","fr"],
        fallbackLng: "en", // use en if detected lng is not available

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
