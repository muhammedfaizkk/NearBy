import axios from 'axios';
import React from 'react'
import trushbin from './images/icons8-waste-50.png'
import { Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";





function Cards({ resName, photographs, neighborhood, location, id }) {
    const userType = useSelector((state) => state?.users?.user?.userDetails?.userType ?? 'Not available');

    const myLocation = useLocation();
    const navigate = useNavigate()
    const resRemove = async () => {
        try {
            const deleteRes = await axios.delete(`http://localhost:5000/resRemove/${id}`, { withCredentials: true });
            if (deleteRes.data.success) {
                navigate('/')
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <div>
            <div className='card-child'>
                <Card style={{ width: '18rem', display: 'flex', alignItems: 'center' ,position:'relative'}}>
                  
                    <Card.Img className='card-img' variant="top" src={`${process.env.REACT_APP_SERVER_URL}${photographs[0]}`} />
                    <Card.Body>
                        <Card.Title>
                            <p style={{ textAlign: 'center' }}>
                                {resName}
                            </p>
                        </Card.Title>
                        <Card.Text>
                            <ul className='card-cnt'>
                                <li>Neighborhood:{neighborhood}</li>
                                <li>Location:{location}</li>
                            </ul>
                        </Card.Text>

                        <div className='card-button'>
                            <Button variant="dark" as={Link} to={`/restuarantdetais/${id}`}>
                                SEE MORE
                            </Button>
                            {(myLocation.pathname === '/myRes' || userType === 'admin') && (
                                <Button variant="info" as={Link} to={`/updateres/${id}`}>
                                    Edit
                                </Button>
                            )}
                        </div>
                        {(myLocation.pathname === '/myRes' || userType === 'admin') && (
                            <div className='remove-btm'>
                                  <img className='trush-bin' src={trushbin} alt="" />
                            </div>
                        )}







                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Cards
