import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

function Restuarantdetais() {

    const { id } = useParams()
    const resDetails = useSelector((state) => state?.restuarants?.resData?.resData)
    const selRestuarant = resDetails.find((data) => data._id === id)



    return (
        <Container className='my-5'>
            <Row>
            <Col md={8}>
    <Carousel data-bs-theme="dark">
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={`${process.env.REACT_APP_SERVER_URL}${selRestuarant.photographs[1]}`}
                alt="First slide"
                style={{ height: '500px' , objectFit:'cover'}}
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={`${process.env.REACT_APP_SERVER_URL}${selRestuarant.photographs[0]}`}
                alt="Second slide"
                style={{ height: '500px' , objectFit:'cover'}}
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100 "
                src={`${process.env.REACT_APP_SERVER_URL}${selRestuarant.photographs[2]}`}
                alt="Third slide"
                style={{ height: '500px' , objectFit:'cover'}}
            />
        </Carousel.Item>
    </Carousel>
</Col>

                <Col md={4} className='px-md-5 '>
                    <div className='cnt-right'>
                        <h1>{selRestuarant.resName}</h1>
                        <div>
                            <p><b>FEATURES</b></p>
                            <p>{selRestuarant.features}</p>
                        </div>
                        <div>
                            <p><b>Location</b></p>
                            <p>{selRestuarant.location}</p>
                        </div>
                        <div>
                            <span><b>Type:</b></span> <span>{selRestuarant.foodType}</span>
                            <div className='nei'>
                                <p><b>Neighborhood:</b></p>
                                <p>{selRestuarant.neighborhood}</p>
                            </div>
                        </div>
                        <div>
                            <p><b>Description</b></p>
                            <p>{selRestuarant.description}</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>

    )
}

export default Restuarantdetais
