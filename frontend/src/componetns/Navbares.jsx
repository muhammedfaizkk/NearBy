import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import "./style.css"
import profImg from '../images/icons8-user-100.png'
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { deleteUser } from '../redux/userSlice';
import { Button } from 'react-bootstrap';



function Navbares() {
    const dispatch = useDispatch()
    const yourInlineStyles = {
        display: 'flex',
        textDecoration: 'none',
        alignItems: 'center',
        color: 'white'
    };
    const yourInlineStyle = {
        display: 'flex',
        textDecoration: 'none',
        color: 'white'
    };
    const userData = useSelector((state) => state?.users ?? 'Not available');
    const isAuth = userData && userData.isAuth;

    const userName = userData?.user?.userDetails?.userName;

    const logOut = () => {
        Cookies.remove("token")
        dispatch(deleteUser(''))
    }
    return (
        <div className='nav-main text-white'>
            <Navbar expand="lg" className="nav-parent" >
                <Container>
                    <Navbar.Brand href="#home">
                        <div className='nav-logo-section'>
                            <span className='nav-logo'>Near</span><span className='text-info'>By</span>
                        </div>
                    </Navbar.Brand>
                    <div className='prof-menuIcon' style={{ display: 'flex', alignItems: "center" }}>
                        <img src="" alt="" />
                        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ height: '50px', backgroundColor: 'white !important' }} />

                    </div>


                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto ">
                            <Link to={'/'} style={yourInlineStyles} className='text-white'><b>Home</b></Link>

                            <Nav.Link className='text-white'><b>Menu</b></Nav.Link>
                            <Nav.Link className='text-white'><b>Gallery</b></Nav.Link>
                            <Link style={yourInlineStyles} className='text-white'><b>Contact</b></Link>
                            {isAuth && <Link className='Link text-white' to={'/dashboard'}><b>Dashboard</b></Link>}

                        </Nav>

                        <div className='nav-end-section'>
                            <div>

                                {isAuth ?

                                    <div className='nav-logout'>
                                        <Button className='btn btn-info' onClick={logOut} >Logout</Button>
                                        {/* <Link className='btn btn-dark ' onClick={logOut} style={yourInlineStyle}>Logout</Link> */}
                                        <div className='nav-profsection'>
                                            <img src={profImg} className='profimg' alt="Profile" />
                                            <span className='profilName'><b>{userName}</b></span>
                                        </div>


                                    </div>

                                    :

                                    <Button className='btn btn-info' as={Link} to={'/login'}>Login</Button>

                                }
                            </div>

                        </div>

                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </div>
    )
}

export default Navbares
