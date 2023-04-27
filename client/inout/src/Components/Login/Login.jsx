import React, { useEffect, useRef } from 'react'
import axios from 'axios';

function Login() {

  const nameRef = useRef("");
  const emailRef = useRef("");
  const phnoRef = useRef("");
  const passwordRef = useRef("");

  useEffect(() => {
    console.log(nameRef.current.value);
  })

  const clickHandler = (e) => {
    e.preventDefault();
    console.log(nameRef.current.value);
    console.log(emailRef.current.value);
    console.log(phnoRef.current.value);
    console.log(passwordRef.current.value);
    axios.post("http://localhost:3030/register", {name: nameRef.current.value, email: emailRef.current.value, phno: phnoRef.current.value, password: passwordRef.current.value})
      .then((data) => console.log("Send successfuly\nmsg:\n", data.data.msg))
      .catch((err) => console.log("error occured\nmsg:\n", err));
  } 

  return (
    <div className='fluid-container bg-info vh-100 d-flex justify-content-center align-items-center'>
    <div className='bg-light col-lg-4 col-md-6 col-sm-10 offset-sm-0 p-sm-0 p-md-5 rounded-4 shadow-lg'>
    <center className='display-6 border-bottom border-info pb-3'>Register with KCS</center>
        <div className="form-floating my-5">
          <input ref={nameRef} type="name" className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="form-floating">
          <input ref={emailRef} type="email" className="form-control" id="floatingEmail" placeholder="Password" />
          <label htmlFor="floatingEmail">Email</label>
        </div>
        <div className="form-floating my-5">
          <input ref={phnoRef} type="number" className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">+91 Phno Number</label>
        </div>
        <div className="form-floating">
          <input ref={passwordRef} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <center>
          <button className='btn btn-outline-success center mt-5' onClick={clickHandler}>Register Now !</button>
        </center>
      </div>
    </div>
  )
}

export default Login