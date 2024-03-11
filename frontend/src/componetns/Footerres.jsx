import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';

function Footerres() {
  return (
    <div className='footer-parent'>
      <Container fluid>
        <Row className='footer-parent-sub'>

          <Col lg={3} sm={6}>
            <div className="footer-op">
              <ul className='footer-menu'>
                <li className='nav-logo-section'><span className='nav-logo'>Near</span><span className='text-info'>By</span></li>
              </ul>
            </div>
          </Col>

          <Col lg={3} sm={6}>
            <div className='footer-menu '>
              <ul>
                <li><b>Support</b></li>
                <li>Tripadvisor@gmail.com</li>
                <li>+8190235878</li>
                <li>TripadvisorKerala</li>
                <li>+8190235878</li>
              </ul>
            </div>
          </Col>

          <Col lg={3} sm={6}>
            <div className='footer-menu'>
              <ul>
                <li><b>About</b></li>
                <li>Our Team</li>
                <li>Our story</li>
                <li>Benefits</li>
                <li>24*Support</li>
              </ul>
            </div>
          </Col>

          <Col lg={3} sm={6}>
            <div className='footer-menu'>
              <ul>
                <li><b>Enter your Email</b></li>
                <li className='footer-cnt'>
                  <input className='mail' type="email" />
                  <Button className='footer-submit bg-info'>Submit</Button>{' '}
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default Footerres;
