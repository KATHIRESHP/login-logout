import React from 'react'
import { json, useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate();
    const logoutHandler = () => {
        sessionStorage.setItem('login_object', JSON.stringify({isLoggedIn: false, email: "email"}));
        navigate('/login');
    }

  return (
    <div>
        This is home page
        <button className='btn btn-danger' onClick={(e) => logoutHandler(e)}>logout</button>
    </div>
  )
}

export default Home