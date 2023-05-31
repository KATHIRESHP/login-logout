import React, { useRef } from 'react'

const Password_Reset = () => {

  const emailRef = useRef(null);
  return (
    <div>
      <div className='vh-100 wh-100 d-flex justify-content-center align-items-center bg-light'>
        <div className='bg-success col-md-9 col-sm-11 col-lg-4 offset-sm-0 p-sm-5 p-md-5 rounded-4 shadow-lg'>
          <div className="form-floating">
            <input ref={emailRef} type="email" className="form-control" id="floatingEmail" placeholder="n" />
            <label htmlFor="floatingEmail">Email</label>
          </div>
          <center><button className='btn btn-danger my-4'>Reset</button></center>
        </div>
      </div>
    </div>
  )
}

export default Password_Reset