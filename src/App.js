import './index.css';
import Employees from './pages/Employees';
import Customers from './pages/Customers';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path='/employees' element={<Employees/>} />
          <Route path='/customers' element={<Customers/>} />
        </Routes>
      </Header>
    </BrowserRouter >
  );
}

export default App;
