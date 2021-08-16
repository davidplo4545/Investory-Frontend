import React from 'react';



import { BigNavbar, SmallNavbar } from './Navbars';

const NavbarMenu = ({isTheme, setIsTheme, isLoginDialog, setIsLoginDialog}) => {
    

    return (
        <React.Fragment>
            <BigNavbar setIsTheme={setIsTheme} 
            isTheme={isTheme}
            isLoginDialog={isLoginDialog}
            setIsLoginDialog={setIsLoginDialog}/>
            <SmallNavbar setIsTheme={setIsTheme} 
            isTheme={isTheme}
            isLoginDialog={isLoginDialog}
            setIsLoginDialog={setIsLoginDialog}/>
        </React.Fragment>
    )
}

export default NavbarMenu;