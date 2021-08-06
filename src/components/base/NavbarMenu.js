import React from 'react';



import { BigNavbar, SmallNavbar } from './Navbars';

const NavbarMenu = ({isTheme, setIsTheme}) => {
    

    return (
        <React.Fragment>
            <BigNavbar setIsTheme={setIsTheme} isTheme={isTheme}></BigNavbar>
            <SmallNavbar></SmallNavbar>
        </React.Fragment>
    )
}

export default NavbarMenu;