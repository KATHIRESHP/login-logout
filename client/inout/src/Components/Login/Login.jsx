import React from 'react'

function Login() {
  return (
    <div className='fluid-container col-4 offset-2'>
      <div class="form-floating mb-3 vw-50">
        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
        <label for="floatingPassword">Password</label>
      </div>
    </div>
  )
}

export default Login