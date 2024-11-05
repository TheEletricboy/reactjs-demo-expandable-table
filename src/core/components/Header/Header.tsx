import './Header.scss';
import Logo0 from '../../../svgs/primteit-main0.svg?react';
import Logo1 from '../../../svgs/primteit-main1.svg?react';
import { useNavigate } from 'react-router-dom';
import DarkThemeSwitcher from '../DarkTheme/DarkThemeSwitcher';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { useCallback } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => navigate('/'),[navigate]);
  return (
    <header className='main-header'>
      <div className='main-header-logo' onClick={handleNavigate}>
        <Logo0 className='logo-0'/>
        <Logo1 className='logo-1'/>
      </div>
      <DarkThemeSwitcher/>
      <LanguageSwitcher/>
    </header>
  );
};

export default Header;
