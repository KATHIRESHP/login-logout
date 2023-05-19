import { React, useContext } from 'react'
import { Context } from '../App'
import { Navigate, Outlet } from 'react-router-dom';

function Protectedroutes() {

  const [token , setToken] = useContext(Context);
  const tempObj = JSON.parse(sessionStorage.getItem('login_object'));
  const isLoggedIn = tempObj.isLoggedIn;
  return (
    (token[0] || isLoggedIn) ? <Outlet/>: <Navigate to='/login'/>
  )
}

export default Protectedroutes