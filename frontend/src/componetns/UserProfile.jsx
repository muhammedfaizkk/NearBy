
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { userUpdate } from '../redux/userSlice';
import { ToastContainer, toast, Bounce } from 'react-toastify';


function UserProfile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state?.users?.user?.userDetails ?? 'Not available');

    const [input, setInput] = useState({
        userName: "",
        email: "",
    })
    const [formErr, formSetErr] = useState({});
    const [isSubmited, setSubmit] = useState(false)


    const HandleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });


    }





    const validateForm = (values) => {
        const errors = {};
        var usernamePattern = /^[a-zA-Z]{5,20}_?[a-zA-Z]*$/;
        var userEmailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!values.userName) {
            errors.userName = "Username is required"
        }
        else if (!usernamePattern.test(values.userName)) {
            errors.userName = "Username must be 3-20 characters and can only contain letters"
        }
        if (!values.email) {
            errors.email = " Email is required"
        }
        else if (!userEmailPattern.test(values.email)) {
            errors.email = "Enter valid email"
        }

        return errors
    }


    const submitHandler = (e) => {
        e.preventDefault();
        formSetErr(validateForm(input));
        setSubmit(true);
        formSubmit();
    };
    const notify = () => {
        toast.success('Your profile successfully updated !!!', {
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
    const formSubmit = async () => {
        if (Object.keys(formErr).length === 0 && isSubmited) {
            try {
                const res = await axios.post(`http://localhost:5000/profileUpdate/${userDetails.userId}`, input, { withCredentials: true });
                if (res) {
                    notify()
                    dispatch(userUpdate(res.data))
                    setTimeout(async () => {
                        navigate('/dashboard')
                    }, 2999);
                }
                else {
                    toast.error('User Details not available', {
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
            } catch (error) {
                toast.error(`Error during axios.post${error}`,{
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            };
        }
    };



    return (
        <div>
            <div className='Signup'>
                <div className='Signup-sub'>
                    <ToastContainer />
                    <form action="" onSubmit={submitHandler}>
                        <div className='input-sty-prnt'>
                            <div className='sing-head'>
                                <h1>Edit profile</h1>
                            </div>

                            <div className='input-sty'>
                                <label htmlFor="" style={{ 'textAlign': 'center' }}><b>User name</b></label>
                                <div className='img-inp'>

                                    <input type="text"
                                        name='userName'
                                        value={input.userName}
                                        defaultValue={userDetails.userName}
                                        onChange={HandleInputChange}

                                    />
                                </div>

                            </div>
                            <span className='error-message'>{formErr.userName}</span>

                            <div className='input-sty'>
                                <label htmlFor="" style={{ 'textAlign': 'center' }}><b>Email</b></label>
                                <div className='img-inp'>

                                    <input type="email" name='email'
                                        value={input.email}
                                        defaultValue={userDetails.userEmail}
                                        onChange={HandleInputChange}



                                    />
                                </div>
                            </div>
                            <span className='error-message'>{formErr.email}</span>


                        </div>
                        <div className='endSection'>
                            <Button variant="dark" type='sumit'>Edit</Button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default UserProfile
