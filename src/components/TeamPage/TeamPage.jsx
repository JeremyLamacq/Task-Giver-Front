/* eslint-disable react/prop-types */
// import { members } from '../../datas/datas';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './TeamPage.scss';
import { Link } from 'react-router-dom';
import { fetchTeamById } from '../../api/apiTeams';

/**
 * 
 * @returns 
 */
export const IdFromUrl = () => {
    const { id } = useParams();
    const idFromUrl = id;

    if (id) {
        return idFromUrl;
    } else {
        return;
    }
}

const TeamPage = ({ members, maxTableRows, token, setTeamId, teamId }) => {
    const { id } = useParams();
    const [team, setTeam] = useState('');
    
    useEffect(() => {
        const loadTeam = async () => { 
            try {
                const teamData = await fetchTeamById(id, token);
                if (teamData) {
                    setTeam(teamData);
                    setTeamId(teamData.id)
                } else {
                    console.error('Aucune donnée d\'équipe reçue de l\'API.');
                }
            } catch (error) {
                console.error('Erreur lors du chargement de l\'équipe :', error);
            }
        }
    
        if (id) {
            loadTeam();
        }
    }, [id, token, setTeamId]);

    const handleReturnClick = () => {
        window.history.back();
    };

    return (
        <section id='teamPage'>

            <h1>Equipe {team?.title}</h1>
            <article>{team?.description}</article>

            <table>
                <thead>

                    <tr>
                        <th>
                            <h3>Liste des membres</h3>
                        </th>
                        <th>
                            <Link to={`/equipes/${teamId}/membres`}>
                                <button>Liste</button>
                            </Link>
                        </th>
                    </tr>

                </thead>
                <tbody>

                    <tr id="title">
                        <td>Nom</td>
                        <td>Prénom</td>
                        <td>Rôle(s)</td>
                    </tr>
                    
                    {members && members.slice(0, maxTableRows).map ((member, key) => 
                        <tr key={key} >     
                            

                        <td className='member'><Link to={`/equipes/${teamId}/membres/${member.user.id}`}>{member.user.lastname}</Link></td>
                        <td className='member'><Link to={`/equipes/${teamId}/membres/${member.user.id}`}>{member.user.firstname}</Link></td>
                        <td className='member memberRolesState'><Link to={`/equipes/${teamId}/membres/${member.user.id}`}>{
                                        member.teamRoles.length === 1
                                            ? (
                                            <span className='member  badge'>{member.teamRoles[0]}</span>
                                            )
                                            : member.teamRoles.length === 2
                                            ? (
                                            <>
                                                <span className='member badge'>{member.teamRoles[0]}</span>
                                                <span className='member badge'>{member.teamRoles[1]}</span>
                                            </>
                                            )
                                            : (
                                            <>
                                                <span className='member badge'>{member.teamRoles[0]}</span>
                                                <span className='member badge'>{member.teamRoles[1]}</span>
                                                <span className='member badge'>{member.teamRoles[2]}</span>
                                            </>
                                            )
                                }</Link></td>
                             
                        </tr>
                    )}
                    
                </tbody>
            </table>

            <section className='actions'>
                <button type='click' onClick={handleReturnClick}>retour</button>
            </section>

        </section>
    )
}

export default TeamPage;