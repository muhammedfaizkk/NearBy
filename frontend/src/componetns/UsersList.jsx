import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import trushbin from './images/icons8-waste-50.png'




function UsersList() {

    const [newUser, setNewuser] = useState([])
    const loggedUser = useSelector((state) => state.users.user.userDetails)
    const deleteAccount = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/deleteAccount/${id}`, {
                withCredentials: true
            });

            if (res.data.success) {

            } else {
                alert('Account deletion failed.');
            }
        } catch (error) {
            alert(`Error during delete: ${error.message}`);
        }
    };

    const userLi = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/users`, { withCredentials: true })
            const allusersList = res?.data?.allUsers ?? []
            if (res.data) {
                const newUsers = Array.isArray(allusersList) ? allusersList.filter((newUser) => newUser._id !== loggedUser.userId) : [];
                setNewuser(newUsers);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const userHandler = async (id) => {

        try {
            const res = await axios.put(`http://localhost:5000/userAcive/${id}`, {}, { withCredentials: true });
            if (res.data.success) {
                userLi();
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        userLi();
    }, [])



    return (
        <div className='usersList'>
            <table className='users-table'>
                <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Remove</th>
                </tr>


                {newUser && newUser.map((element, index) => (

                    <tr key={index}>
                        <td>{element.userName}</td>
                        <td>{element.email}</td>
                        <td>
                            <Button onClick={() => userHandler(element._id)} className='active-btn' variant={element.isActive ? 'success' : 'danger'}>
                                {element.isActive ? 'Active' : 'Inactive'}
                            </Button>
                        </td>
                        <td>
                            <img className='trush-bin-userslist' onClick={() => deleteAccount(element._id)} src={trushbin} alt="" />
                        </td>
                    </tr>
                ))}

            </table>
        </div>
    )
}

export default UsersList
