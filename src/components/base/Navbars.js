import React, {useState, useContext} from 'react'
import {menuItems} from './constants'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import {userLogout} from '../../api/authentication.js'
import {UserContext} from '../../context/UserContext'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const BigNavbar = () =>{

    const user = useContext(UserContext)
    const [secMenuItems, setSecMenuItems] = useState([])
    const handleMenuItemClick = (item) =>{
        setSecMenuItems(item.secMenuItems)
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
                                            <Nav.Link key={item.title} onClick={() => handleMenuItemClick(item)}>{item.title}<ExpandMoreIcon/></Nav.Link> :
                                            <Nav.Link key={item.title} onClick={() => handleMenuItemClick(item)} as={Link} to={item.link}>{item.title}</Nav.Link> 
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
            {user.token !== null &&
                <div className="navbar-secondary">
                    <Navbar className="secondary" bg="light"  variant="light" expand="lg">
                            <div className="collapsed-center">
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            </div>
                            <Navbar.Collapse id="basic-navbar-nav"> 
                                <Nav className="mr-auto">
                                    {secMenuItems.map((item) => {
                                        return <Nav.Link key={item.title}  as={Link} to={item.link}>{item.title}</Nav.Link>
                                    })}
                                </Nav>
                            </Navbar.Collapse>
                                
                            
                    </Navbar>
                </div>
            }
        </div>
    )
}

export const SmallNavbar = () =>{
    const user = useContext(UserContext)

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
                                        {menuItems.map(item => {
                                        return (item.link !== null ?
                                                <Nav.Link key={item.title}  as={Link} to={item.link}>{item.title}</Nav.Link> :
                                                <NavDropdown key={item.title}  title={item.title} id="basic-nav-dropdown">
                                                    {item.secMenuItems.map(secItem => {
                                                        return <NavDropdown.Item as={Link} key={secItem.title}  to={secItem.link}>{secItem.title}</NavDropdown.Item>            
                                                    })}
                                                </NavDropdown>        
                                            
                                        )})}
                                
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

