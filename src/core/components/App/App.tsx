import './App.scss';
import { useOverlay } from '../../contexts/OverlayContext';
import { OverlayContainer } from '../OverlayContainer/OverlayContainer';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TableContextProvider } from '../../contexts/TableContext';
import Greeting from '../Greeting/Greeting';
import Header from '../Header/Header';
import MasterTable from '../MasterTable/MasterTable';
import Button from '../GenericButton/Button';

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
            {/** @TODO Move this context somewhere else */}
            <TableContextProvider>
              <MasterTable index={1}/>
            </TableContextProvider>
          </>
        )}
        <OverlayContainer/>
      </main>
    </>
  );
};

export default App;
