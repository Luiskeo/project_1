import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.js';
import es from './locales/es/translation.js';
import fr from './locales/fr/translation.js';
import de from './locales/de/translation.js';

// 🔹 Definir los recursos de traducción
const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
};

// 🔹 Detectar idioma guardado o usar el del navegador
const savedLanguage = localStorage.getItem("language") || navigator.language.split("-")[0] || "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // 🔹 Usa el idioma guardado o el del navegador
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

// 🔹 Función para cambiar y guardar el idioma
export const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  localStorage.setItem("language", lng); // 🔹 Guarda el idioma seleccionado
};

export default i18n;
