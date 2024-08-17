import { NavLink } from 'react-router-dom';

import './Footer.scss';

const Footer = () => {

    return (
        <footer>

            <ul>

                <li><NavLink to="/mentions-legales">Mentions légales</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li><NavLink to="/a-propos">A propos de Task Giver</NavLink></li>
                
            </ul>

        </footer>
    )
}

export default Footer;