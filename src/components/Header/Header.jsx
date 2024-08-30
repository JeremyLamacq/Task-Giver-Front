/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import NavbarMobil from '../Navbar/NavbarMobil';
import Navbar from '../Navbar/Navbar';
import UpdateAccount from '../Widgets/UpdateAccount';

import './Header.scss';

const Header = ({ isLogin, logout, teamId, token, userProfil }) => {
    
/*************adjust the navbar with the screen size ***********/ 

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateWindowSize = () => {
            setIsMobile(window.innerWidth < 992);
        };
        updateWindowSize(); 
        window.addEventListener('resize', updateWindowSize); 
        return () => {
            window.removeEventListener('resize', updateWindowSize);
        };
    }, []);

/*******************location after login  **********************/

    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isInscriptionPage = location.pathname === '/inscription';

/********************* open the widget *************************/

const [open, setOpen] = useState (false);

    const handleOpenParamWidget = () => {
        return (setOpen((prevstate) => !prevstate))
    };

    return (
        <div id="header">
            <div>{ !isMobile && <Navbar className={ isLogin ? '' : 'hiddenNav'} 
                teamId={teamId}
                isLogin={isLogin} 
                logout={logout} 
                isHomePage={isHomePage} 
                isInscriptionPage={isInscriptionPage} 
                handleOpenParamWidget={handleOpenParamWidget}/>}
            </div>          
            <div className={isMobile ? 'mobilHeader' : ''}>
                { isMobile && <NavbarMobil handleOpenParamWidget={handleOpenParamWidget} 
                teamId={teamId} 
                isLogin={isLogin} 
                logout={logout}/> }
            </div>
            
            
            <UpdateAccount open={open} setOpen={setOpen} token={token} userProfil={userProfil}/>

        </div>
    )
}

export default Header;