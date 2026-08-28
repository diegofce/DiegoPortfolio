import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'es') return saved;
    return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (path) => path.split('.').reduce((value, key) => value?.[key], translations[language]) ?? path;
  const toggleLanguage = () => setLanguage((current) => (current === 'es' ? 'en' : 'es'));

  return <LanguageContext.Provider value={{ language, t, toggleLanguage }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
