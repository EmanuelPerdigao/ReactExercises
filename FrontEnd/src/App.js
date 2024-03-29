import './index.css';
import Employees from './pages/Employees';
import Customers from './pages/Customers';
import Customer from './pages/Customer';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dictionary from './pages/Dictionary';
import Definition from './pages/Definition';
import NotFound from './components/NotFound';
import { TestPage } from './pages/TestPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { createContext, useEffect, useState } from 'react';
import { data } from "./SharedData";

export const LoginContext = createContext();

function App() {

  useEffect(() => {

    const minute = 1000 * 60;

    function refreshTokens() {
      if (localStorage.refresh) {
        const url = data.baseURL + 'api/token/refresh/';

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh: localStorage.refresh,
          }),
        }).then((response) => {
          return response.json();
        }).then((data) => {

          localStorage.access = data.access;
          localStorage.refresh = data.refresh;
          setLoggedIn(true);
        });
      }
    }

    setInterval(() => {
      refreshTokens();
    }, minute * 3);
  })

  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  function changeLoggedIn(value) {
    setLoggedIn(value);

    if (value === false) {
      localStorage.clear();
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path='/employees' element={<Employees />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/api/customer/:id' element={<Customer />} />
            <Route path='/dictionary/:search' element={<Definition />} />
            <Route path='/dictionary' element={<Dictionary />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='/testpage' element={<TestPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register/>} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
