/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import './UpdateAccount.scss';
import { updateUserProfil } from '../../api/apiUsers';
import { useEffect } from 'react';

const UpdateAccount = ({ open, setOpen, token, userProfil}) => {

    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [company, setCompany] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [validatePassword, setValidatePassword] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (newPassword === validatePassword) {
          setPassword(newPassword);
        } else {
          console.log("Les nouveaux mots de passe ne sont pas identiques");
        }
      }, [newPassword, validatePassword]);

    /**
     * 
     * @param {*} e 
     */
    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            if (token) {
              const updateUser = {
                  lastname: lastname,
                  firstname: firstname,
                  company: company,
                  oldPassword: oldPassword,
                  newPassword: password
              };
              const updatedUser = await updateUserProfil(token, updateUser);
              console.log("Profil modifiée avec succès");
            //   window.location.reload();
      
            }
          } catch (error) {
            console.error("Erreur lors de la modification du profil :", error);
          }

    }

    /**
     * 
     * @returns 
     */
    const handleValidateForm = () => {
        return setOpen((prevstate) => !prevstate);
    }

    /**
     * 
     * @returns 
     */
    const handleCloseWidget = () => {
        return setOpen((prevstate) => !prevstate);
    }
    
    return (
        <>
            {userProfil && (userProfil.map((user, key) => (
                <form key={key} onSubmit={handleSubmit} className={`display ${open ? 'open' : ''}`}>
                        <h2 >Modification paramètres utilisateur</h2>
                        <input type='text' name='text' required placeholder={user.lastname} onChange={(e) => setLastname(e.target.value)}/>
                        <input type='text' name='text' required placeholder={user.firstname} onChange={(e) => setFirstname(e.target.value)} />
                        <input type='text' name='text' required placeholder={user.company} onChange={(e) => setCompany(e.target.value)} />
                        <p>Si vous souhaitez changer de mot de passe</p>
                        <input type='password' name='password' required placeholder='ancien mot de passe'onChange={(e) => setOldPassword(e.target.value)}/>
                        <input type='password' minLength={6} name='password' required placeholder='nouveau mot de passe'onChange={(e) => setNewPassword(e.target.value)}/>
                        <input type='password' minLength={6} name='password' required placeholder='validation nouveau mot de passe'onChange={(e) => setValidatePassword(e.target.value)}/>
                        <button type='click' onClick={handleValidateForm}>Valider</button>
                </form>
            )))}

            <div type='click' onClick={handleCloseWidget} className={`curtain ${open ? 'open' : ''}`}></div>
        </>
    )
}

export default UpdateAccount;