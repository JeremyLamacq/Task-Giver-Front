/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createUser } from "../../api/apiUsers";

import "./SignUpPage.scss";

const SignUpPage = () => {

    const navigate = useNavigate();

    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [company, setCompany] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');

    /**
     * 
     * @param {*} event 
     */
    const handleCreateUser = async (event) => {
        event.preventDefault();

        try {
            if (mail) {
                const userData = {
                    lastname: lastname,
                    firstname: firstname,
                    company: company,
                    password: password,
                    email: mail
                };
                // eslint-disable-next-line no-unused-vars
                const createdUser = await createUser(userData);
                console.log("Tâche créée avec succès :", userData);
                setLastname('');
                setFirstname('');
                setCompany('');
                setPassword('');
                setMail('');
                navigate('/connexion');

            } else {console.log('erreur')}
        } catch (error) {
          console.error("Erreur lors de la création de la tâche :", error);
        }
    }

    const handleReturnClick = () => {
        window.history.back();
    };

    return (
        <section id="signUpPage">
            <h1>Inscription</h1>
            <div id="centerPage">
                <img src="/images/logo-poule.png"></img>
         
                <form id="form" onSubmit={handleCreateUser}>
                    <div id="formFirstLine">
                        <input type='text' name='lastname' placeholder='Nom' onChange={(e) => setLastname(e.target.value)}/>
                        <input type='text' name='firstname' placeholder='Prénom' onChange={(e) => setFirstname(e.target.value)}/>
                    </div>
                    <div id="formSecondLine">
                        <input type='text' name='company' placeholder='Entreprise' onChange={(e) => setCompany(e.target.value)}/>
                        <input type='password' name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <input type='email' name='email' placeholder='E-mail' onChange={(e) => setMail(e.target.value)}/>
                    <button type="submit">Inscription</button>
                </form>
              
            </div>

            <section className='actions'>
                <button type='click' onClick={handleReturnClick}>retour</button>
            </section>
            
        </section>
    )
}

export default SignUpPage;