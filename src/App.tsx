import Button from './core/components/GenericButton/Button';
import { useOverlay } from './core/contexts/OverlayContext';
import { OverlayContainer } from './core/components/OverlayContainer/OverlayContainer';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './core/components/Header/Header';
import './App.scss';

const githubRepo = 'https://github.com/TheEletricboy/reactjs-demo-expandable-table';

// Unnecessary to put this in its own file imo, it's a simple greeting and it achieves its goal.
const Greeting = () => {
  const { t } = useTranslation();
  return (
    <section className='greeting'>
      <h1>
        {t('homepage.greeting')}
        <span className='developer-name'>{t('homepage.greeting-developer')}</span>
      </h1>
      <h3>
        <p>{t('homepage.greeting-description-1')}</p>
        <p>{t('homepage.greeting-description-2')}</p>
        <p>
          <span className='github-link'>
            {'>'}<a href={githubRepo} target="_blank">reactjs-demo-expandable-table</a>
          </span>
        </p>
      </h3>
    </section>
  );
};

const App = () => {
  const { addOverlay } = useOverlay();
  const [ t ] = useTranslation();
  const lblStartAssingment = t('homepage.start-assignment');

  const openOverlay = useCallback(() => {
    addOverlay({
      id: "start-overlay",
      content: <div>Let's begin!</div>,
      isVisible: true,
      type: "modal",
      label: lblStartAssingment,
      // onClose: () => console.log("some log test"),
      // props: { animationType: "fade" }
    });
  }, [addOverlay, lblStartAssingment]);

  return (
    <>
      <Header/>
      <main className='main-app'>
        <Greeting/>
        <Button title='Begin the demo' label={lblStartAssingment} onClick={openOverlay} />
        <OverlayContainer/>
      </main>
    </>
  );
};

export default App;
