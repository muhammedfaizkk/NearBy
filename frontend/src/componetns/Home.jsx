
import { Container, Row, Col, Button } from 'react-bootstrap'
import background from '../images/nordwood-themes-mue4Jwr-N5M-unsplash.jpg'
import Cards from './Cards'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getResdetails } from '../redux/restuarantsSlice'

function Home() {
    const resdata = useSelector((state) => state?.restuarants?.resData?.resData);
    const dispatch = useDispatch()
    useEffect(() => {
        const getRestuarants = async () => {
            try {
                const res = await axios.get('http://localhost:5000/getAllres')
                dispatch(getResdetails(res.data))
            } catch (error) {
                alert(error.message)
            }
        }
        getRestuarants()
    }, [])

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col className='p-0'>
                        <div className='background-img'>
                            <img src={background} alt="" />
                            <div className='content-back'>
                                <div className='abslt-cnt'>

                                    <h2>Let food be thy medicine and   <br /> medicine
                                        be thy food</h2>
                                    <h5>
                                        Although the skills aren’t hard to learn, finding the happiness <br /> and finding the satisfaction and finding fulfillment <br /> in continuously serving somebody else something good to eat
                                    </h5>
                                </div>
                                <div>
                                    <Button variant="info">Book online</Button>{' '}
                                    <Button variant="outline-info">See More</Button>{' '}
                                </div>

                            </div>
                        </div>


                    </Col>
                </Row>
                <Row>


                    {resdata &&
                        resdata.map((element, index) => (
                            <Col lg={4} md={6} key={index}>
                                <div className='card-par'>
                                    <Cards resName={element.resName} photographs={element.photographs} neighborhood={element.neighborhood} location={element.location} id={element._id} index={index} />
                                </div>
                            </Col>
                        ))
                    }



                </Row>


            </Container >
        </div>
    )
}

export default Home
