/* eslint-disable react/prop-types */
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {FiUser} from 'react-icons/fi';
import Navbar from '../Navbar/NavbarMobil';
import './Header.scss';

const Header = ({ isLogin, logout }) => {

    // const [userButtonVisibility, setUserButtonVisibility] = useState(false);

    // const toggleUserButton = () => {
    //     setUserButtonVisibility(prev => !prev);
    // };

    // const closeUserMenu = () => {
    //     setUserButtonVisibility(false);
    // };
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    // const isConnexionPage = location.pathname === '/connexion';
    const isInscriptionPage = location.pathname === '/inscription';

    //If we modify 'open' to 'true', we close this our widget
    let open = true;

    const handleOpenParamWidget = () => {};

    const handleUpdateAccount = () => {};


    return (
        <div id="header">
            <Navbar openWidget={handleOpenParamWidget} logout={logout} isHomePage={isHomePage} isInscriptionPage={isInscriptionPage} isLogin={isLogin} />
            {/* <nav className={ isLogin ? '' : 'hiddenNav'}>
                <div id="leftNavbar">
                    <div id="logo">Logo</div>
                    <div id="boardButtons">
                        <NavLink to="/equipes/[id]" onClick={closeUserMenu}><button >Equipe</button></NavLink>
                        <NavLink to="/equipes/[id]/leaderboard" onClick={closeUserMenu}><button>Leader</button></NavLink>
                        <NavLink to="/equipes/[id]/giverboard" onClick={closeUserMenu}><button>Giver</button></NavLink>
                        <NavLink to="/equipes/[id]/taskerboard" onClick={closeUserMenu}><button>Tasker</button></NavLink>
                    </div>
                </div>
                <div id="userMenu">
                    
                    <div id="userSelect" className={userButtonVisibility ? '' : 'hiddeUserSelect'}>
                        <span>Utilisateur</span>
                        <ul id="userLinks" className="">
                            <li><NavLink type='click' onClick={handleOpenParamWidget}><span>Paramètres</span></NavLink></li>
                            <li><NavLink to="/utilisateur"><span>Page personnel</span></NavLink></li>
                            <li><NavLink to="/connexion" onClick={logout}><span>Déconnexion</span></NavLink></li>
                        </ul>
                    </div>                      
                   
                    <div id="userIcon" onClick={toggleUserButton}><FiUser size={30} color="#577399"/></div> 
                </div>
            </nav>

            <nav className={ isLogin ? 'hiddenNav' : ''}>
                <div id="leftUnloggedNavbar">
                    <div id="logo">Logo</div>
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
            </nav> */}

            <window className={`display ${open ? '' : 'open'}`}>
                <h2></h2>
                <input type='text' name='text' placeholder='Nom'/>
                <input type='text' name='text' placeholder='Prénom'/>
                <input type='text' name='text' placeholder='Entreprise associé'/>
                <input type='mail' name='mail' placeholder='E-mail'/>
                <p>Si vous souhaitez changer de mot de passe</p>
                <input type='text' name='text' placeholder='ancien mot de passe'/>
                <input type='text' name='text' placeholder='nouveau mot de passe'/>
                <input type='text' name='text' placeholder='validation nouveau mot de passe'/>
                <button type='submit' onSubmit={handleUpdateAccount}>Valider</button>
            </window>

            <div className={`curtain ${open ? '' : 'open'}`}></div>

        </div>
    )
}

export default Header;