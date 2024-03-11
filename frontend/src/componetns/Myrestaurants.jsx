import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyrestaurant } from '../redux/restuarantsSlice'
import { Container, Row, Col } from 'react-bootstrap'
import Cards from './Cards'
import 'react-toastify/dist/ReactToastify.css';
// import { useLocation } from 'react-router-dom';

function Myrestaurants() {


    const dispatch = useDispatch()
    const userId = useSelector((state) => state?.users?.user?.userDetails?.userId ?? 'not Available')
    const myresData = useSelector((state) => state?.restuarants?.myRes ?? 'not Available')
    useEffect(() => {
        getMyrestaurants()
    }, [])

    const getMyrestaurants = async () => {
        try {
            const myRestaurants = await axios.get(`http://localhost:5000/myRestaurants/${userId}`, { withCredentials: true });
            dispatch(getMyrestaurant(myRestaurants?.data?.myRestaurants ?? []))

        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <Container>
            <Row>

                {myresData &&
                    myresData.map((element, index) => (

                        <Col lg={4} md={6} key={index}>
                            <div className='card-par'>
                                <Cards resName={element.resName} photographs={element.photographs} neighborhood={element.neighborhood} location={element.location} id={element._id} index={index} />
                            </div>
                        </Col>
                    ))
                }



            </Row>
        </Container>


    )
}

export default Myrestaurants
