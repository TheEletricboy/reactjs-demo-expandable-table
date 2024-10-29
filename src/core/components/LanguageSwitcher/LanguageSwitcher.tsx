import './LanguageSwitcher.scss';
import Button from "../GenericButton/Button";
import PtFlag from '../../../svgs/flags/pt.svg?react';
import UkFlag from '../../../svgs/flags/uk.svg?react';
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n"; '../../../i18n';
import { useCallback, useMemo, useState } from "react";
import { userPreferencesKeyLocalStorage } from "../../utils/constants";

const getTitle = (t: typeof i18n.t, langKey: string) => `${t('language-switcher.switch-to')} ${t(`language-switcher.languages.${langKey}`)}`;

// Would be great to add this to a context in the future.
export const LanguageSwitcher = () => {
  const {t} = useTranslation();
  const [language, setLanguage] = useState<string>(() =>{
    const savedPrefs = localStorage.getItem(userPreferencesKeyLocalStorage) || '{}';
    return JSON.parse(savedPrefs).language ?? i18n.language;
  });

  const newLang = useMemo(() => language === 'en-GB' ? 'pt-PT' : 'en-GB', [language]);
  const title = useMemo(() => getTitle(t, newLang), [t, newLang]);

  const handleLangSwitch = useCallback(() => {
    const savedPrefs = JSON.parse(localStorage.getItem(userPreferencesKeyLocalStorage) || '{}') as object;

    setLanguage(newLang);
    localStorage.setItem(
      userPreferencesKeyLocalStorage,
      JSON.stringify({ ...savedPrefs, language: newLang}),
    );

    i18n.changeLanguage(newLang);
  }, [newLang]);

  return (
    <Button
      className="language-switcher"
      onClick={handleLangSwitch}
      title={title}
      isInverse>
      {
        language === 'pt-PT' ? (<PtFlag/>) : (<UkFlag/>)
      }
    </Button>
  );
};
