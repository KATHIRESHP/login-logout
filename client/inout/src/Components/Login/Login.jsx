import React, { useContext, useRef } from 'react';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from '../../App';

function Login() {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const [token , setToken] = useContext(Context);

    const loginHandler = async (e) => {
        e.preventDefault();
        const email_pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (email_pattern.test(emailRef.current.value) && passwordRef.current.value) {
            axios
                .post('http://localhost:3030/login', { email: emailRef.current.value, password: passwordRef.current.value })
                .then((data) => {
                    console.log("axios login send success");
                    if (data.data[0].msg === "user_found") 
                    {
                        let user = data.data[1].user_details[0];
                        console.log(user.name);
                        setToken([true, emailRef.current.value]);
                        toast.success(`Logged in as ${user.name}`, {
                            theme: "dark",
                            autoClose: 4000
                        })
                        sessionStorage.setItem('login_object', JSON.stringify({isLoggedIn: true, email: emailRef.current.value}))
                        setTimeout(() => {
                            navigate('/home');
                        }, 5000)
                    }
                    else
                    {
                        toast.error("User not found", {
                            theme: "dark"   
                        })
                    }
                })
                .catch((err) => {
                    console.log("axios login send falied!")
                })
        }
        else {
            toast('Check Your Credentials!', {
                autoClose: 2000,
                theme: "dark"
            })
        }
    }

    return (
        <>
            <ToastContainer />
            <div className='fluid-container bg-info vh-100 d-flex justify-content-center align-items-center'>
                <div className='bg-light col-md-9 col-sm-11 col-lg-6 offset-sm-0 p-sm-5 p-md-5 rounded-4 shadow-lg'>
                    <center><div className='display-6 mb-5'>Login</div></center>
                    <div className="form-floating">
                        <input ref={emailRef} type="email" className="form-control" id="floatingEmail" placeholder="n" />
                        <label htmlFor="floatingEmail">Email</label>
                    </div>
                    <div className="form-floating my-4">
                        <input ref={passwordRef} type="password" className="form-control" id="floatingPasword" placeholder="number" />
                        <label htmlFor="floatingPasword">Password</label>
                    </div>
                    <center><button className='btn btn-outline-primary' onClick={(e) => loginHandler(e)}>Login</button></center>
                    <center><button className='btn btn-outline-primary mt-5' onClick={(e) => navigate('/')}>Signup</button></center>
                </div>
            </div>
        </>
    )
}

export default Login