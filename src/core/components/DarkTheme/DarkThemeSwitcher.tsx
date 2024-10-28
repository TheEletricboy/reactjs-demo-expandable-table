import { memo, useCallback, useEffect, useMemo, useState } from "react";
import MoonIcon from '../../../svgs/moon.svg?react';
import SunIcon from '../../../svgs/sun.svg?react';
import Button from "../GenericButton/Button";
import './DarkThemeSwitcher.scss';
import classNames from "classnames";

const themeStorageKey = "isDarkTheme";

/**
 * Currently does not do much other than set a `classname` on the document.
 */
const DarkThemeSwitcher = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    return localStorage.getItem(themeStorageKey) === "true";
  });

  const buttonTitle = useMemo(
    () => (isDarkTheme ? "Toggle Light Theme" : "Toggle Dark Theme"),
    [isDarkTheme],
  );

  const handleOnClick = useCallback(() => {
    const htmlTag = document.documentElement;

    setIsDarkTheme((prevState) => {
      const newTheme = !prevState;
      localStorage.setItem(themeStorageKey, newTheme.toString());

      if (newTheme) {
        htmlTag.classList.add("dark-theme");
      } else {
        htmlTag.classList.remove("dark-theme");
      }
      return newTheme;
    });
  }, []);

  useEffect(() => {
    const htmlTag = document.documentElement;
    if (isDarkTheme) {
      htmlTag.classList.add("dark-theme");
    } else {
      htmlTag.classList.remove("dark-theme");
    }
  }, [isDarkTheme]);

  return (
    <Button
      className={classNames(
        'dark-theme-toggler',
        { 'show-sun-icon': isDarkTheme },
      )}
      isInverse={isDarkTheme}
      onClick={handleOnClick}
      title={buttonTitle}>
      { isDarkTheme ? <SunIcon className="sun-icon"/> : <MoonIcon className="moon-icon"/> }
    </Button>
  );
};

export default memo(DarkThemeSwitcher);
