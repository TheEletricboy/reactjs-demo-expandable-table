import { memo, useCallback, useMemo, useState } from "react";
import MoonIcon from '../../../svgs/moon.svg?react';
import SunIcon from '../../../svgs/sun.svg?react';
import './DarkThemeSwitcher.scss';
import Button from "../GenericButton/Button";

/**
 * Currently does not do much other than set a classname on the document.
 */
const DarkThemeSwitcher = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const buttonTitle = useMemo(() => isDarkTheme ? 'Toggle Light Theme' : 'Toggle Dark Theme', [isDarkTheme]);

  const handleOnClick = useCallback(() => {
    const htmlTag = document.documentElement;
    if (isDarkTheme) {
      htmlTag.classList.remove('dark-theme');
    } else {
      htmlTag.classList.add('dark-theme');
    }
    setIsDarkTheme(prevState => !prevState);
  }, [isDarkTheme]);

  return (
    <Button className={'dark-theme-toggler'} onClick={handleOnClick} title={buttonTitle}>
      { isDarkTheme ? <SunIcon className="sun-icon"/> : <MoonIcon className="moon-icon"/> }
    </Button>
  );
};

export default memo(DarkThemeSwitcher);
