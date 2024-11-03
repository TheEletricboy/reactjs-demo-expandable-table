import { useOverlay } from '../../contexts/OverlayContext';
import { OverlayContainer } from '../OverlayContainer/OverlayContainer';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '../Header/Header';
import { useFilterContext } from '../../contexts/FilterContext';
import MasterTableFilters from '../MasterTable/MasterTableFilters/MasterTableFilters';
import MasterTable from '../MasterTable/MasterTable';
import Button from '../GenericButton/Button';
import './App.scss';

// DEV
const FilterSummary= () => {
  const { filters } = useFilterContext();

  return (
    <div style={{ marginBottom: '20px', fontSize: '14px', color: '#888', display: 'flex', gap: '3rem' }}>
      {Object.entries(filters).map(([dimension, selectedValues]) => (
        selectedValues.length > 0 && (
          <div key={dimension} style={{ marginBottom: '5px' }}>
            <strong>{dimension}:</strong> {selectedValues.join(', ')}
          </div>
        )
      ))}
    </div>
  );
};

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
  const [ showTable, setShowTable ] = useState(false);

  const { addOverlay } = useOverlay();
  const [ t ] = useTranslation();

  const lblStartAssingment = t('homepage.start-assignment');

  const openOverlay = useCallback(() => {
    addOverlay({
      id: "start-overlay",
      content: (removeOverlay) => (<Button label='Show Table' onClick={() => {
        removeOverlay();
        setShowTable(true);
      }} />),
      isVisible: true,
      type: "modal",
      label: lblStartAssingment,
      // onClose: () => setShowTable(true),
    });
  }, [addOverlay, lblStartAssingment]);

  return (
    <>
      <Header/>
      <main className='main-app'>
        <Greeting/>
        <Button title='Begin the demo' label={lblStartAssingment} onClick={openOverlay} />
        { showTable && (
          <>
            <h2>Filters</h2>
            <MasterTableFilters/>
            <h2>Master Table</h2>
            <FilterSummary />
            <MasterTable index={1}/>
          </>
        )}
        <OverlayContainer/>
      </main>
    </>
  );
};

export default App;
