import React, { useContext} from 'react'
import {menuItems} from './constants'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import {userLogout} from '../../api/authentication.js'
import {UserContext} from '../../context/UserContext'
import {Switch, useTheme, makeStyles} from "@material-ui/core";
import LoginDialogForm from '../forms/LoginDialogForm';
import lightThemeLogo from '../../images/light_logo.png'
import darkThemeLogo from '../../images/dark_logo.png'

const useStyles = makeStyles((theme) =>{
    return({
        root:{
            background: 'transparent !important',
            color:  `${theme.palette.text.primary} !important`,
            borderBottom: `1px solid ${theme.palette.text.secondary}`,
            paddingBottom:'5px',
            fontWeight:'bold',
            '& .navbar-center':{
                width: '60%',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: '0.5rem',
            },
            '& .collapsed-center':{
                display:'flex',
                justifyContent:'space-between',
                
            },
            '& .navbar-brand':{
                fontSize: '1.7rem',
                fontFamily: 'Cabin Sketch',
                color: `${theme.palette.text.primary} !important`,
                transition: 'all ease-in 0.3s',
                marginBottom: '0.5rem',
                '&:hover':{
                    opacity:0.8,
                }
            },
            '& .nav-link':{
                fontSize: '1rem',
                color:  `${theme.palette.text.primary} !important`,
                fontFamily: theme.palette.text.fontFamily,
                transition: 'all ease-in 0.2s',
                '&:hover':{
                    color:`${theme.palette.text.secondary} !important`,
                },
            },
            '& .dropdown-menu':{
                background: theme.palette.type === 'light' ? '#fff' : theme.palette.secondary.main,
                '& .dropdown-item':{
                    color: theme.palette.common.black,
                    transition:'all ease-in 0.3s'

                }
            },
            [theme.breakpoints.down('md')]: {
                '& .navbar-center':{
                    flexDirection:'column',
                    transition: 'all ease-in 0.5s',
                    width: '100%',
                },
                '& .collapsed-center':{
                    width: '100%',
                    marginBottom:'0.2rem',
                },
                '& .navbar-collapse':{
                    width: '95%',
                }
            }
        }
    })
})
export const NavbarMenu = ({setIsTheme, isTheme, isLoginDialog, setIsLoginDialog}) =>{

    const user = useContext(UserContext)
    const history = useHistory()
    const theme = useTheme()
    const classes = useStyles()

    const onLogout = () => {
        userLogout(user.token,user.setToken)
        history.push({
            pathname:`/`,
        });
    }

    const handleThemeChange = () =>{
        localStorage.setItem('theme', isTheme ? 'dark' : 'light')
        setIsTheme(!isTheme)
    }
    return (
        <div>   
            <LoginDialogForm isLoginDialog={isLoginDialog}
            setIsLoginDialog={setIsLoginDialog}/>
            <Navbar className={classes.root} bg="light"  variant="light" expand="lg">
                <div className="navbar-center">
                    <div className="collapsed-center">
                        <Navbar.Brand href="/">
                            {theme.palette.type === 'light'?
                            <img alt="light-logo" src={lightThemeLogo} style={{height:'40px', width:'40px', marginRight:'0.4rem'}}/>:
                            <img alt="dark-logo" src={darkThemeLogo} style={{height:'40px', width:'40px', marginRight:'0.4rem'}}/>
                            }
                            Investory
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </div>
                    
                        {user.token == null ?
                            <Navbar.Collapse id="basic-navbar-nav"> 
                                <Nav className="ml-auto">
                                    <Switch color="default" checked={isTheme} onChange={handleThemeChange}/>

                                    <Nav.Link onClick={() => setIsLoginDialog(!isLoginDialog)}>Sign In</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        :
                            <Navbar.Collapse id="basic-navbar-nav"> 
                                <Nav className="mr-auto">

                                    {menuItems.map((item) => {
                                        return (item.link === null ?
                                            <NavDropdown key={item.title}
                                                  title={item.title}
                                                   id="basic-nav-dropdown">
                                                    {item.secMenuItems.map(secItem => {
                                                        return <NavDropdown.Item as={Link} key={secItem.title}  to={secItem.link}>{secItem.title}</NavDropdown.Item>            
                                                    })}
                                            </NavDropdown>:
                                            <Nav.Link key={item.title} as={Link} to={item.link}>{item.title}</Nav.Link> 
                                        )
                                    })}  
                                </Nav>
                                <Nav>
                                    <Switch color="default" checked={isTheme} onChange={handleThemeChange}/>
                                    <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        }
                    
                </div>
            </Navbar>
        </div>
    )
}

export default NavbarMenu