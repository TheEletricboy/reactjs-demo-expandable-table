import Button from './core/components/GenericButton/Button';
import DarkThemeSwitcher from './core/components/DarkTheme/DarkThemeSwitcher';

import './App.scss';

const App = () => {
  return (
    <div className='main-app'>
      <DarkThemeSwitcher/>
      <Button title='Begin the demo' label='Start Assignment demo' />
    </div>
  );
};

export default App;
