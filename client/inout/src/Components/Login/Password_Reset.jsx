import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Password_Reset = () => {

  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [timer, setTimer] = useState(1200);
  const [otpSend, setOtpSend] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const otpRef = useRef(null);

  const otpSendHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3030/pwdresetotp', { email: emailRef.current.value })
      .then((data) => {
        setOtpSend(true);
        setOtp(data.data.msg);
        console.log("Send success\n" + data.data.msg);
      })
      .catch((err) => {
        console.log("error occred" + err);
      });
  }

  const otpVerificationHandler = (e) => {
    e.preventDefault();
    if(otp === otpRef.current.value && otp)
    {
      toast.success("Verification success :)",{
        autoClose: 2000
      })
      setOtpVerified(true);
    }
    else
    {
      toast.error("Please verify otp again :(");
    }
  }

  const resetHandler = (e) => {
    e.preventDefault();
    console.log(passwordRef.current.value + " " + confirmPasswordRef.current.value);
    console.log(emailRef.current.value);
    if (passwordRef.current.value == confirmPasswordRef.current.value) {
      axios
        .post('http://localhost:3030/pwdreset', { email: emailRef.current.value, password: passwordRef.current.value })
        .then((data) => {
          console.log("entered");
          console.log(data.data.msg);
          if (data.data.msg == "success") {
            toast.success("Password reset Success");
            setTimeout(() => {
              navigate('/login');
            }, 5000);

          }
          console.log("resetting send success");
        })
        .catch((err) => {
          console.log("Error occured" + err);
        })
    }
    else {
      toast.warning("Password Mismatch!!");
    }

  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0 && otpSend) {
        setTimer((e) => e - 1);
      } else {
        if (otpSend) {
          navigate('/login');
        }
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, otpSend]);

  return (
    <div>
      <ToastContainer />
      <div className='vh-100 wh-100 d-flex justify-content-center align-items-center bg-info'>
        <div className='bg-light col-md-9 col-sm-11 col-lg-6 col-xl-5 offset-sm-0 p-sm-5 p-md-5 rounded-4 shadow-lg'>
          <center className='display-6 mb-5'>Password Reset</center>
          <form>
            <div className="form-floating">
              <input ref={emailRef} type="email" className="form-control" id="floatingEmail" placeholder="n" />
              <label htmlFor="floatingEmail">Email</label>
            </div>
            {!otpSend &&
              <center><button className='btn btn-danger my-4' onClick={(e) => otpSendHandler(e)}>Send Otp</button></center>
            }
          </form>
          {(otpSend && !otpVerified) &&
            <>
              <div className="form-floating mt-4">
                <input ref={otpRef} type="password" className="form-control" id="floatingOtp" placeholder="n" />
                <label htmlFor="floatingPasword">OTP</label>
              </div>
              <center><button className='btn btn-success my-3' onClick={(e) => otpVerificationHandler(e)}>verify otp</button></center>
            </>
          }
          <></>
          {otpVerified &&
            <>
              <form>
                <div className="form-floating mt-4">
                  <input ref={passwordRef} type="password" className="form-control" id="floatingPasword" placeholder="n" />
                  <label htmlFor="floatingPasword">Password</label>
                </div>
                <div className="form-floating">
                  <input type="password" className="form-control my-4" id="floatingConfirmPassword" placeholder="n" ref={confirmPasswordRef} />
                  <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                </div>
                <center><button className='btn btn-success mb-4' onClick={(e) => resetHandler(e)}>Reset</button></center>
              </form>
            </>
          }
          <></>
          <center>
            <button className='btn btn-warning p-3'>{timer} secs</button>
          </center>
        </div>
      </div>
    </div>
  )
}

export default Password_Reset