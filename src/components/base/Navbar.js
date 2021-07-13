import React, {useContext} from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import {UserContext} from '../../context/UserContext'
import {userLogout} from '../../api/authentication.js'

const NavbarMenu = () => {
    const user = useContext(UserContext)

    const onLogout = () => {
        console.log('Logged Out')
        userLogout(user.token,user.setToken)
        return <Redirect to="/home" />;
    }
    return (
        <Navbar bg="light"  variant="light" expand="lg">
            <div className="navbar-center">
                <div className="collapsed-center">
                    <Navbar.Brand href="/">
                        {/* <Nav.Link as={Link} to='/'>Long-Term</Nav.Link> */}
                        Long-Term
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </div>
                
                    {user.token == null ?
                        <Navbar.Collapse id="basic-navbar-nav"> 
                            <Nav className="ml-auto">
                                <Nav.Link as={Link} to='signin'>Sign In</Nav.Link>
                                <Nav.Link as={Link} to='register'>Get Started</Nav.Link>
                                
                                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown> */}
                            </Nav>
                        </Navbar.Collapse>
                    :
                        <Navbar.Collapse id="basic-navbar-nav"> 
                            <Nav className="mr-auto">
                                {/* <Nav.Link as={Link} to='profile'>Profile</Nav.Link> */}
                                <NavDropdown title="Assets" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to='/assets/isr'>Israeli</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/assets/us'>US</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/assets/crypto'>Crypto</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="My Profile" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Photos</NavDropdown.Item>
                                    <NavDropdown.Item href="friends">Friends</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Collections</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                                
                            </Nav>
                            <Nav>
                                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    }
                
            </div>
        </Navbar>
    )
}

export default NavbarMenu;