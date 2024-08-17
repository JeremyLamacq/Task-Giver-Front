/* eslint-disable react/prop-types */
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {RxHamburgerMenu} from 'react-icons/rx';

import './NavbarMobil.scss';

const NavbarMobil = ( {logout, handleOpenParamWidget, teamId, isLogin  } ) => {

    const id = teamId;

    const [menuButtonVisibility, setMenuButtonVisibility] = useState(false);
    const location = useLocation();
    const isUserPage = location.pathname === '/utilisateur';

    const toggleMenuButton = () => {
        setMenuButtonVisibility(prev => !prev);
    };

    const closeBurgerMenu = () => {
        setMenuButtonVisibility(false);
    };
    
    const openWidgetVsCloseBurgerMenu = () => {
        handleOpenParamWidget();
        closeBurgerMenu();
    }

    const logoutVsCloseBurgerMenu = () => {
        closeBurgerMenu();
        logout();
    }

    return (
        <div id="navHeader">
        <div id="topNav">
            <div id="logo">Task Giver</div>
            <div id="burgerMenu" onClick={toggleMenuButton}><RxHamburgerMenu size={30} /></div>
        </div>
        <nav className={menuButtonVisibility ? 'showNavbar' : 'hiddeNavbar'}>
            <ul>
                {(isLogin && !isUserPage) ? <>
                <li className='alignLeft navHeight'>Aller vers:</li>
                <li className="blueBackground navHeight"><NavLink onClick={closeBurgerMenu} to="/equipes/[id]"><span>Equipe</span></NavLink></li>                      
                <li className="navHeight"><NavLink onClick={closeBurgerMenu} to={`/equipes/${id}/leaderboard`}><span>Leader</span></NavLink></li>
                <li className="blueBackground navHeight"><NavLink onClick={closeBurgerMenu} to={`/equipes/${id}/giverboard`}><span>Giver</span></NavLink></li>
                <li className="navHeight"><NavLink onClick={closeBurgerMenu} to={`/equipes/${id}/taskerboard`}><span>Tasker</span></NavLink></li> 
                </> : "" }               
                <li className="blueBackground alignLeft navHeight">Compte:</li>
                {isLogin ? <>
                <li className="navHeight"><NavLink type='click' onClick={openWidgetVsCloseBurgerMenu} ><span>Paramètres</span></NavLink></li>
                <li className="blueBackground navHeight"><NavLink onClick={closeBurgerMenu} to="/utilisateur"><span>Page personnel</span></NavLink></li>
                <li className="navHeight"><NavLink to="/" onClick={logoutVsCloseBurgerMenu}><span>Déconnexion</span></NavLink></li>               
                </> : <>
                <li className="navHeight"><NavLink to="/inscription" onClick={closeBurgerMenu}><span>Inscription</span></NavLink></li>
                <li className="navHeight"><NavLink to="/connexion" onClick={closeBurgerMenu}><span>Connexion</span></NavLink></li> 
                </>}

                <li className="blueBackground alignLeft navHeight">Informations:</li>
                <li className="navHeight"><NavLink onClick={closeBurgerMenu} to="/mentions-legales"><span>Mentions légales</span></NavLink></li>
                <li className="blueBackground navHeight"><NavLink onClick={closeBurgerMenu} to="/contact"><span>Contact</span></NavLink></li>
                <li className="navHeight"><NavLink onClick={closeBurgerMenu} to="/a-propos"><span>A propos de Task Giver</span></NavLink></li>
            </ul>  
        </nav>
        <div className={menuButtonVisibility ? 'greyUnderMenu' : ''}>

        </div>
            
        </div>
    )
}

export default NavbarMobil;