import React from 'react'
import resimg from './images/icons8-restaurant-48.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import profImg from '../images/icons8-user-100.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../redux/userSlice';


function AddresHome() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state) => state?.users ?? 'Not available');
    const userId = userData?.user?.userDetails?.userId;
    const userType = useSelector((state) => state?.users?.user?.userDetails?.userType ?? 'Not available');




    const deleteAccount = async () => {
        try {
            const res = await axios.delete(`http://localhost:5000/deleteAccount/${userId}`, {
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(deleteUser(''))
                navigate('/');


            } else {
                alert('Account deletion failed.');
            }
        } catch (error) {
            alert(`Error during delete: ${error.message}`);
        }
    };




    return (
        <div className='resDash'>
            <Link to={'/myRes'} className='Link'>
                <div className='dashboard'>
                    <h2>My Restaurants</h2>
                    <img className='resIcons' src={resimg} alt="" />
                </div></Link>
            <Link className='Link' to={"/addres"}>
                <div className='dashboard'  >
                    <h2>Add Restuarants</h2>
                    <img className='resIcons' src={resimg} alt="" />
                </div>
            </Link>


            <Link to={'/updateres'} className='Link'>
                <div className='dashboard'>
                    <h2>Update Restaurants</h2>
                    <img className='resIcons' src={resimg} alt="" />
                </div>
            </Link>
            <Link to={''} className='Link'>
                <div className='dashboard'>
                    <h2>Edit Restaurants</h2>
                    <img className='resIcons' src={resimg} alt="" />
                </div>
            </Link>

            {userType === 'admin' && (
                <Link to="/userlist" className="Link">
                    <div className="dashboard">
                        <h2>Users List</h2>
                        <img className="resIcons" src={profImg} alt="" />
                    </div>
                </Link>
            )}


            <Link className='Link' to={`/userProfile/${userId}`}>
                <div className='dashboard'>
                    <h2>Update Profile</h2>
                    <img className='resIcons' src={profImg} alt="" />
                </div>
            </Link>


            {userType !== 'admin' && (
                <Link to="#" className="Link">
                    <div className="dashboard" onClick={deleteAccount}>
                        <h2>Delete account</h2>
                        <img className="resIcons" src={profImg} alt="" />
                    </div>
                </Link>
            )}







        </div>
    )
}

export default AddresHome
