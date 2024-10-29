import DarkThemeSwitcher from '../DarkTheme/DarkThemeSwitcher';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import './Header.scss';

export const Header = () => {
  return (
    <header className='main-header'>
      <DarkThemeSwitcher/>
      <LanguageSwitcher/>
    </header>
  );
};
