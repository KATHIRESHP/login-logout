import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const nameRef = useRef("");
  const [email, setEmail] = useState("");
  const phnoRef = useRef("");
  const passwordRef = useRef("");
  const otpRef = useRef("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifyBtnClicked, setIsVerifyBtnClicked] = useState(false);
  const [otp, setOtp] = useState("");

  const sendOtpHandler = (e) => {
    e.preventDefault();
    let email_pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (email_pattern.test(email)) {
      axios.post('http://localhost:3030/emailverify', { email: email })
        .then((res) => {
          toast.success(`OTP sent\nPlease also check spam folders`, {
            autoClose: 2000,
            theme: 'dark'
          })
          setOtp(res.data.msg);
          setIsVerifyBtnClicked(true);
        })
        .catch((err) => {
          toast.error("error occured!!")
          console.log(err);
        })
    }
    else {
      toast.error("Enter vaid email", {
        autoClose: 2000
      })
    }
  }

  const verifyHandler = (e) => {
    e.preventDefault();
    if(otpRef.current.value && otpRef.current.value === otp)
    {
      toast.success("Email verification success", {
        autoClose: 3000
      })
      setIsEmailVerified(true);
    }
    else
    {
      toast.error("Invalid OTP");
    }
  }

  const clickHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3030/register", { name: nameRef.current.value, email: email, phno: phnoRef.current.value, password: passwordRef.current.value })
      .then((data) => {
        console.log(data.data.msg);
        if(data.data.msg === "error")
        {
          toast.error("Error in registeration or Duplication of email", {
            theme: "light"
          })
        }
        else
      {
        toast.success("Successfully registered", {
          autoClose: 2000
        })
      }
      })
      .catch((err) => console.log("error occured\nmsg:\n", err));
  }

  return (
    <>
      <ToastContainer />
      <div className='fluid-container bg-info vh-100 d-flex justify-content-center align-items-center'>
        <div className='bg-light col-lg-4 col-md-6 col-sm-10 offset-sm-0 p-sm-5 p-md-5 rounded-4 shadow-lg'>
          <center className='display-6 border-bottom border-info mb-2 pb-3'>Register with KCS</center>

          {!isEmailVerified &&
            <>
              {!isVerifyBtnClicked &&
                <>
                  <div className="form-floating">
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="floatingEmail" placeholder="Password" />
                    <label htmlFor="floatingEmail">Email</label>
                  </div>
                  <center><button className='btn btn-outline-primary mt-3' onClick={(e) => sendOtpHandler(e)}>Send Otp</button></center>
                </>
              }
              <></>
              {isVerifyBtnClicked &&
                <>
                  <div className="form-floating">
                    <input ref={otpRef} type="email" className="form-control" id="floatingEmail" placeholder="number" />
                    <label htmlFor="floatingEmail">Enter the otp..</label>
                  </div>
                  <center><button className='btn btn-outline-warning mt-3' onClick={(e) => verifyHandler(e)}>verify</button></center>
                </>
              }
              <></>
            </>
          }
          <></>
          {isEmailVerified &&
            <>
              <div className="form-floating my-3">
                <input ref={nameRef} type="name" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating my-3">
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
            </>
          }
        </div>
      </div>
    </>
  )
}

export default Login