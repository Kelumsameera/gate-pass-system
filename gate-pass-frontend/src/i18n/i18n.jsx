// src/i18n/i18n.jsx
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import si from "./locales/si.json";
import ta from "./locales/ta.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      si: { translation: si },
      ta: { translation: ta },
    },
    fallbackLng: "en",
    detection: {
      order: ["navigator", "localStorage", "cookie"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: { escapeValue: false },
    debug: import.meta.env.DEV, // Fixed for Vite
  });

export default i18n;
