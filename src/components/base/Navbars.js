import React, {useState, useContext} from 'react'
import {menuItems} from './constants'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import {userLogout} from '../../api/authentication.js'
import {UserContext} from '../../context/UserContext'

export const BigNavbar = () =>{

    const user = useContext(UserContext)
    const [secMenuItems, setSecMenuItems] = useState([])
    const handleMenuItemClick = (item) =>{
        setSecMenuItems(item.secMenuItems)
        console.log(item.secMenuItems)
    }

    const onLogout = () => {
        userLogout(user.token,user.setToken)
        return <Redirect to="/home" />;
    }
    return (
        <div className="big-navbar">   
            <Navbar bg="light"  variant="light" expand="lg">
                <div className="navbar-center">
                    <div className="collapsed-center">
                        <Navbar.Brand href="/">
                            Long-Term
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </div>
                    
                        {user.token == null ?
                            <Navbar.Collapse id="basic-navbar-nav"> 
                                <Nav className="ml-auto">
                                    <Nav.Link as={Link} to='/signin'>Sign In</Nav.Link>
                                    <Nav.Link as={Link} to='/register'>Get Started</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        :
                            <Navbar.Collapse id="basic-navbar-nav"> 
                                <Nav className="mr-auto">

                                    {menuItems.map((item) => {
                                        return (item.link === null ?
                                            <Nav.Link onClick={() => handleMenuItemClick(item)}>{item.title}</Nav.Link> :
                                            <Nav.Link onClick={() => handleMenuItemClick(item)} as={Link} to={item.link}>{item.title}</Nav.Link> 
                                        )
                                    })}  
                                </Nav>
                                <Nav>
                                    <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        }
                    
                </div>
            </Navbar>
        
            <Navbar bg="light"  variant="light" expand="lg">
            <div className="navbar-secondary">
                    <div className="collapsed-center">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </div>
                    <Navbar.Collapse id="basic-navbar-nav"> 
                        <Nav className="mr-auto">
                            {secMenuItems.map((item) => {
                                return <Nav.Link as={Link} to={item.link}>{item.title}</Nav.Link>
                            })}
                        </Nav>
                    </Navbar.Collapse>
                        
                    
                </div>
            </Navbar>
        </div>
    )
}

export const SmallNavbar = () =>{
    const user = useContext(UserContext)
    const [secMenuItem, setSecMenuItems] = useState([])
    const handleMenuItemClick = (item) =>{
        setSecMenuItems(item.secMenuItems)
    }

    const onLogout = () => {
        userLogout(user.token,user.setToken)
        return <Redirect to="/home" />;
    }
    return (
        <div className="small-navbar">
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
            </div>
    )
}

