/* eslint-disable react/prop-types */
import {BiSolidPencil} from 'react-icons/bi';
import { useState } from 'react';
import { createTeam } from '../../api/apiTeams'

import './UserPage.scss';
import { Link } from 'react-router-dom';

const UserPage = ({ teams, setTeams, token, userProfil}) => {
    
    const [open, setOpen] = useState(false);
    const [teamTitle, setTeamTitle] = useState('');
    const [teamDescription, setTeamDescription ] = useState('');

    /**
     * 
     */
    const handleOpenCreateTeamWidget = () => {
      setOpen((prevState) => !prevState);
    };
    
    /**
     * 
     * @param {*} event 
     */
    const handleSubmitTeam = async (event) => {
      event.preventDefault();
      try {
        if (token) {
          const newTeamData = {
            title: teamTitle,
            description: teamDescription
          };
          const createdTeam = await createTeam(newTeamData, token);
          console.log('Équipe créée avec succès :', createdTeam);
          setTeamTitle('');
          setTeamDescription('');
          setOpen(false);

          setTeams([...teams, newTeamData]);
          
        }
      } catch (error) {
        console.error('Erreur lors de la création de l\'équipe :', error);
      }
    };
  
    return (
        <section id='userPage'>

            <h1>Bonjour {userProfil[0].firstname}</h1>
            <h3>Voici vos équipes</h3>
            
            <table>
                <thead>
                    <tr>
                        <th><h2>Sélectionnez votre équipe</h2></th>
                    </tr>
                </thead>
                <tbody>         
                        {teams && teams.map ((team, key) => 
                        <tr key={key}>
                            <td ><Link className='team' to={`/equipes/${team.id}`}>{team.title}</Link></td>
                        </tr>)}
                </tbody>
            </table>

            <form onSubmit={handleSubmitTeam} className={`display ${open ? 'open' : ''}`}>
                <h2>Création d&apos;une équipe</h2>
                <input 
                    type='text' 
                    name='text' 
                    placeholder="nom de l'équipe"
                    value={teamTitle}
                    onChange={(e) => setTeamTitle(e.target.value)}
                />
                <textarea 
                    type='text' 
                    placeholder='description de l&apos;équipe' 
                    value={teamDescription}
                    onChange={(e) => setTeamDescription(e.target.value)}

                />

                <button type='submit'>Valider</button>
            </form>
            <button id='createTeam' type='click' onClick={handleOpenCreateTeamWidget}>Créer une équipe <BiSolidPencil /></button>
            
            <div 
                type='button' 
                onClick={handleOpenCreateTeamWidget} 
                className={`curtain ${open ? 'open' : ''}`}
                ></div>

        </section>
    )
}

export default UserPage;