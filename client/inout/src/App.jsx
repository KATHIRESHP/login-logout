import Signup from './Components/Signup/Signup'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from './Components/Home/Home';
import Protectedroutes from './Components/Protectedroutes';
import React, { useState } from 'react';
import Password_Reset from './Components/Login/Password_Reset';

export const Context = React.createContext();

function App() {

  const [token , setToken] = useState([false, "email"]);
  sessionStorage.setItem('login_oject',{isLoggedIn: false, email: 'email'});
  return (
    <div className="App">
      <BrowserRouter>
        <Context.Provider value={[token, setToken]}>
          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/pwdreset' element={<Password_Reset/>}/>
            <Route element={<Protectedroutes />}>
              <Route path='/home' element={<Home />} />
            </Route>
            <Route path='*' element={<div>Error in url</div>} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;