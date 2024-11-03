import DarkThemeSwitcher from '../DarkTheme/DarkThemeSwitcher';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import './Header.scss';

const Header = () => {
  return (
    <header className='main-header'>
      <DarkThemeSwitcher/>
      <LanguageSwitcher/>
    </header>
  );
};

export default Header;
