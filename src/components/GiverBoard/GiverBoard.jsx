/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import './GiverBoard.scss';

const GiverBoard = ( { tasks, members, maxTableRows, urlTeamRole, teamId }) => {

    return (
        <section id="giverBoard">
            <h1>Giver board</h1>

            <table>
                <thead>
                    <tr>
                        <th>Liste des tâches</th>
                        <th className='button'>
                            <Link className='createTask' to={`/equipes/${teamId}/taches/${urlTeamRole}?`}>
                            {(tasks) && <button>Liste</button>}
                            </Link>
                            <Link className='createTask' to={`/equipes/${teamId}/taches/ajouter`}>
                                <button>Ajouter</button>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Titre</td>
                        <td>Statut</td>
                        <td>Catégorie</td>
                        <td className='media'>Tasker</td>
                        <td className='media'>Limite acceptation</td>
                        <td className='media'>Limite réalisation</td>
                    </tr>
                    {(tasks) && tasks.slice(0, maxTableRows).map((task, index) => (
                        
                            <tr key={index} >
                                <td className='task' ><Link to={`/equipes/${teamId}/taches/${task.id}/${urlTeamRole}?`}>{task.title}</Link></td>
                                <td className='task' ><Link to={`/equipes/${teamId}/taches/${task.id}/${urlTeamRole}?`}>
                                    {task.status === 0
                                    ? "Non assigné"
                                    : task.status === 1
                                    ? "Assigné"
                                    : task.status === 2
                                    ? "En cours"
                                    : task.status === 3
                                    ? "Réalisé"
                                    : "Refusé"}
                                    </Link></td>
                                <td className='task' ><Link to={`/equipes/${teamId}/taches/${task.id}/${urlTeamRole}?`}>{(task.category) ? task.category.name: ''}</Link></td>
                                <td className='task media' ><Link to={`/equipes/${teamId}/taches/${task.id}/${urlTeamRole}?`}>{(task.assignedTo) ? task.assignedTo.lastname + ' ' + task.assignedTo.firstname : ''}</Link></td>
                                <td className='task media' ><Link to={`/equipes/${teamId}/taches/${task.id}/${urlTeamRole}?`}>{new Date(task.acceptDeadline).toLocaleDateString('fr')}</Link></td>
                                <td className='task media' ><Link to={`/equipes/${teamId}/taches/${task.id}/${urlTeamRole}?`}>{new Date(task.completionDeadline).toLocaleDateString('fr')}</Link></td>
                            </tr>
                        
                    ))}
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>Liste des Taskers</th>
                        <th className='button'>

                            <Link className='createTask' to={`/equipes/${teamId}/membres`}>
                            {(members) && <button>Liste</button>}

                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nom</td>
                        <td>Prénom</td>
                    </tr>
                    {(members) && members.slice(0, maxTableRows).map((member, index) => (
                        member.teamRoles.includes("TASKER") ? (
                        
                                <tr key={index}>
                                    <td className='member' ><Link  to={`/equipes/${teamId}/membres/${member.user.id}`}>{member.user.lastname}</Link></td>
                                    <td className='member' ><Link  to={`/equipes/${teamId}/membres/${member.user.id}`}>{member.user.firstname}</Link></td>
                                </tr>
                            
                        ) : ""    
                    ))}
                </tbody>
            </table>

        </section>
    )

}

export default GiverBoard;