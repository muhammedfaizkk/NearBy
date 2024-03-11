import React from 'react'
import './style.css'
import { useState, useEffect } from 'react'
import user from './images/icons8-username-30.png'
import email from './images/icons8-email-50.png'
import password from './images/icons8-password-24.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast, Bounce } from 'react-toastify';


function AddresSignup() {
    const [input, setInput] = useState({ userName: '', email: '', password: '', confirmpass: '' });
    const [formErr, formSetErr] = useState({});
    const [isSubmited, setSubmit] = useState(false);
    const navigate = useNavigate();
    const notify = () => {
        toast.success('Registration successful !!!', {
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
    useEffect(() => {
        const submitForm = async () => {
            if (Object.keys(formErr).length === 0 && isSubmited) {
                try {
                    const res = await axios.post('http://localhost:5000/signup', input);
                    console.log(res.data.success);
                    const navigateNext = async () => {
                        if (res.data.success) {
                            notify()
                            setTimeout(async () => {
                                navigate('/login');
                            }, 2999);

                        }
                    }
                    navigateNext()

                } catch (error) {
                    // Handle error
                    console.error('Error during signup:', error);
                }
            }
        };

        submitForm();
    }, [formErr, isSubmited, input, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        formSetErr(validateForm(input));
        setSubmit(true);
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });
    };

    const validateForm = (values) => {
        const errors = {};
        var userNamePattern = /^[a-zA-Z]{5,20}_?[a-zA-Z]*$/;
        var passwordPattern = /^\d{8}$/;
        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;


        if (!values.userName) {
            errors.userName = "Username is required";
        } else if (!userNamePattern.test(values.userName)) {
            errors.userName = "Username must be 3-20 characters and can only contain letters, numbers, and underscores";
        }

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!emailPattern.test(values.email)) {
            errors.email = "Please enter a valid email";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (!passwordPattern.test(values.password)) {
            errors.password = "Enter 8 digit"


        }

        if (!values.confirmpass) {
            errors.confirmpass = "Confirm password is required";
        } else if (values.password !== values.confirmpass) {
            errors.confirmpass = "Passwords do not match";
        }

        return errors;
    };

    return (
        <div className='Signup'>
            <div className='Signup-sub'>
                <ToastContainer />
                <form action="" onSubmit={handleSubmit}>
                    <div className='input-sty-prnt'>
                        <div className='sing-head'>
                            <h1>Sing up</h1>
                            <h5>Create your account</h5>
                        </div>
                        <div className='input-sty'>
                            <label htmlFor="" style={{ 'textAlign': 'center' }}><b>User name</b></label>
                            <div className='img-inp'>
                                <img className='iconsLo' src={user} alt="" />
                                <input type="text"
                                    name='userName'
                                    value={input.userName}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                        <span className='error-message'>{formErr.userName}</span>

                        <div className='input-sty'>
                            <label htmlFor="" style={{ 'textAlign': 'center' }}><b>Email</b></label>
                            <div className='img-inp'>
                                <img className='iconsLo' src={email} alt="" />
                                <input type="text" name='email'
                                    value={input.email}
                                    onChange={handleChange}


                                />
                            </div>
                        </div>
                        <span className='error-message'>{formErr.email}</span>
                        <div className='input-sty'>
                            <label htmlFor="" style={{ 'textAlign': 'center' }}><b>Password</b></label>
                            <div className='img-inp'>
                                <img className='iconsLo' src={password} alt="" />
                                <input type="password" name='password'
                                    value={input.password}
                                    onChange={handleChange}

                                />
                            </div>
                        </div>
                        <span className='error-message'>{formErr.password}</span>
                        <div className='input-sty'>
                            <label htmlFor="" style={{ 'textAlign': 'center' }}><b>Confirm Password</b></label>
                            <div className='img-inp'>
                                <img className='iconsLo' src={password} alt="" />
                                <input type="password" name='confirmpass'
                                    value={input.confirmPassword}
                                    onChange={handleChange}



                                />

                            </div>


                        </div>
                        <span className='error-message'>{formErr.confirmpass}</span>
                    </div>
                    <div className='endSection'>
                        <Button variant="dark" type='sumit'>Sing up</Button>
                        <p>Already have an account? <Link to={'/login'}><b>Login</b></Link></p>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddresSignup
