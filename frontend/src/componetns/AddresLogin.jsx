import React, { useState } from 'react'
import './style.css'
import user from './images/icons8-username-30.png'
import password from './images/icons8-password-24.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { userAuth } from '../redux/userSlice';
import { ToastContainer, toast, Bounce } from 'react-toastify';

function AddresLogin() {

    const notify = () => {
        toast.success('Login successful !!!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };


    const [formErr, formSetErr] = useState({});
    const [isSubmited, setSubmit] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        userName: "",
        password: "",
    })
    const isAuth = useSelector((state) => state.users.isAuth);
    const navigateNext = (status) => {
        if (status.success) {
            notify();
            dispatch(userAuth(status));
            setTimeout(async () => {
                navigate('/');
            }, 2999);
        } else {
            alert("Invalid password or username");
        }
    };


    const HandleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });

    }
    const validateForm = (values) => {
        const errors = {};
        var usernamePattern = /^[a-zA-Z]{5,20}_?[a-zA-Z]*$/;
        var passwordPattern = /^\d{8}$/;

        if (!values.userName) {
            errors.userName = "Username is required"
        }
        else if (!usernamePattern.test(values.userName)) {
            errors.userName = "Username must be 3-20 characters and can only contain letters"
        }

        if (!values.password) {
            errors.password = "password is required"
        }

        else if (!passwordPattern.test(values.password)) {


            errors.password = "Enter 8 digit"

        }
        return errors
    }
    const formSumit = async () => {
        if (Object.keys(formErr).length === 0 && isSubmited) {

            try {
                const res = await axios.post("http://localhost:5000/login", input, {
                    withCredentials: true
                });
                navigateNext(res.data);

            }
            catch {
                toast.error('Error during login', {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        formSetErr(validateForm(input));
        setSubmit(true)
        formSumit();
    };








    return (
        <div className='Signup'>

            <ToastContainer />
            <div className='Signup-sub'>
                <form action="" onSubmit={HandleSubmit}>

                    <div className='input-sty-prnt'>
                        <div className='sing-head'>
                            <h1>Welcome Back</h1>
                            <p><b>Enter your credential to login</b></p>
                        </div>
                        <div className='input-sty'>
                            <label htmlFor="" style={{ 'textAlign': 'center' }}><b>User name</b></label>
                            <div className='img-inp'>
                                <img className='iconsLo' src={user} alt="" />
                                <input type="text"
                                    value={input.userName}
                                    name='userName'
                                    onChange={HandleInputChange}
                                />
                            </div>
                        </div>
                        <span className='error-message'>{formErr.userName}</span>
                        <div className='input-sty'>
                            <label htmlFor="" style={{ 'textAlign': 'center' }}><b>Password</b></label>
                            <div className='img-inp'>
                                <img className='iconsLo' src={password} alt="" />
                                <input type="password"
                                    value={input.password}
                                    name='password'
                                    onChange={HandleInputChange}
                                />
                            </div>
                        </div>
                        <span className='error-message'>{formErr.password}</span>
                    </div>
                    <div className='fgt-pass'>
                        <p><b>Forgot password?</b></p>
                    </div>
                    <div className='endSection'>
                        <Button variant="dark" type='sumit'>Login</Button>
                        <p>Dont have an account? <Link to={'/signup'}><b>signup</b></Link></p>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddresLogin
