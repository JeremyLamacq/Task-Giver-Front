/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {FiUser} from 'react-icons/fi';

import './Navbar.scss';

const Navbar = ({ isLogin, logout, isHomePage, isInscriptionPage, handleOpenParamWidget, teamId }) => {

    const id = teamId;
    const location = useLocation();
    const isUserPage = location.pathname === '/utilisateur'; 
    
/*************open or close the userMenu ***********/ 
    const [userButtonVisibility, setUserButtonVisibility] = useState(false);

    useEffect(() => {
        const isPageReloaded = performance.navigation.type === 1;
        setUserButtonVisibility(isPageReloaded);
    }, []);
    
    const toggleUserButton = () => {
        setUserButtonVisibility(prev => !prev);
    };

    const closeUserMenu = () => {
        setUserButtonVisibility(true);
    };

    const closeUserVsOpenWidget = () => {
        handleOpenParamWidget();
        setUserButtonVisibility(true);
    }

    const logoutVsCloseMenu = () => {
        setUserButtonVisibility(true);
        logout();
    }

    return (
        <div id="navbar">
            <nav className={ (isLogin && !isHomePage) ? '' : 'hiddenNav'}>
                <div id="leftNavbar">
                    <div id="logo">Task Giver</div>
                    <div id="boardButtons" className={ isUserPage ? 'hiddeBoardButtons' : ''}>
                        <NavLink to={`/equipes/${id}`} onClick={closeUserMenu}><button >Equipe</button></NavLink>
                        <NavLink to={`/equipes/${id}/leaderboard`} onClick={closeUserMenu}><button>Leader</button></NavLink>
                        <NavLink to={`/equipes/${id}/giverboard`} onClick={closeUserMenu}><button>Giver</button></NavLink>
                        <NavLink to={`/equipes/${id}/taskerboard`} onClick={closeUserMenu}><button>Tasker</button></NavLink>
                    </div>
                </div>
                <div id="userMenu">
                    
                    <div id="userSelect" className={userButtonVisibility ? 'hiddeUserSelect' : ''}>
                        <span>Utilisateur</span>
                        <ul id="userLinks" className="">
                            <li><NavLink type='click' onClick={closeUserVsOpenWidget}><span>Paramètres</span></NavLink></li>
                            <li><NavLink to="/utilisateur" onClick={closeUserMenu}><span>Page personnel</span></NavLink></li>
                            <li><NavLink to="/connexion" onClick={logoutVsCloseMenu}><span>Déconnexion</span></NavLink></li>
                        </ul>
                    </div>                      
                   
                    <div id="userIcon" onClick={toggleUserButton}><FiUser size={30} color="#577399"/></div> 
                </div>
            </nav> 

            <nav className={ (isLogin && !isHomePage) ? 'hiddenNav' : ''}>
                <div id="leftUnloggedNavbar">
                    <div id="logo">Task Giver</div>
                    <div id="homeButton">
                    {!isHomePage && (
                        <NavLink to="/" onClick={closeUserMenu}>
                            <button>Accueil</button>
                        </NavLink>
                    )}
                    </div>
                </div>
                <div id="inscriptionButton">
                    <NavLink to="/inscription" onClick={closeUserMenu} className={(isHomePage === true) ? '' : 'hiddenButton'}>
                        <button>Inscription</button>
                    </NavLink>
                    <NavLink to={isInscriptionPage === true || isHomePage === true ? '/connexion' : '/inscription'} onClick={closeUserMenu}>
                        <button>{isInscriptionPage === true || isHomePage === true ? 'Connexion' : 'Inscription'}</button>
                    </NavLink>
                </div>
            </nav> 
        </div>
    )
}

export default Navbar;