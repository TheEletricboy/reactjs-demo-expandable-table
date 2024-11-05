import './App.scss';
import Greeting from '../Greeting/Greeting';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';
import MasterTable from '../MasterTable/MasterTable';

const App = () => {
  return (
    <main className='main-app'>
      <Routes>
        <Route path='/' element={<Greeting/>} />
        {/** Has an index for development, wanted to see if I could make a TablesControllerContext */}
        <Route path='/table/:tableId' element={<MasterTable index={1} tableName={'Custom Table Name'}/>} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </main>
  );
};

export default App;
