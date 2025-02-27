import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationFR from "./locales/fr/translation.json";
import translationAR from "./locales/ar/translation.json";
import translationGR from "./locales/gr/translation.json";
import translationEN from "./locales/en/translation.json";

const savedLanguage = localStorage.getItem("language") || "en"; 

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
    .use(initReactI18next)
    .init({
        resources,
        lng: savedLanguage, 
        fallbackLng: "en", 

        keySeparator: false,

        interpolation: {
            escapeValue: false,
        },
    });

const setLanguageDirection = (lng) => {
    document.documentElement.setAttribute("dir", lng === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lng);
};

setLanguageDirection(savedLanguage);

i18n.on("languageChanged", (lng) => {
    localStorage.setItem("language", lng); 
    setLanguageDirection(lng); 
});

export default i18n;
