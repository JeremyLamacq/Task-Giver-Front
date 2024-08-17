/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';


import './MemberPage.scss';

const MemberPage = ( { tasks, members, teamRoles, maxTableRows, urlTeamRole } ) => {
    const { id } = useParams();

    const watchingRole = teamRoles;
    const memberRole = "Tasker/Giver";
  
    const [open, setOpen] = useState (false);
    const [task, setTask] = useState ('');
    const memberToDisplay = members.find(member => member.user.id == id);

    /**
     * 
     * @param {*} e 
     * @returns 
     */
    const handleOpenWidget = (e) => {
        const taskId = e.currentTarget.closest('tr').id;
        setTask(tasks.find(({id}) => id == taskId))    
        return (setOpen((prevstate) => !prevstate))
    }

    /**
     * 
     * @param {*} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault();
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

    /**
     * 
     */
    const handleReturnClick = () => {
        window.history.back();
    };
    
    
    return (
        <section id="memberPage">
        <h1>Membre</h1>
        <div id="topPage">
            <table id="topTable">
                <thead>
                    <tr>
                        <th>Profil</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="">{memberToDisplay && memberToDisplay.user.lastname}</td>
                    </tr>
                    <tr>
                        <td>{memberToDisplay && memberToDisplay.user.firstname}</td>
                    </tr>
                    <tr>
                        <td>Entreprise: {memberToDisplay && memberToDisplay.user.company}</td>
                    </tr>
                    <tr>    
                        <td>{memberToDisplay && memberToDisplay.teamRoles.length === 1                    
                            ? (
                            <span className='member  badge'>{memberToDisplay && memberToDisplay.teamRoles[0]}</span>
                            )
                            : (memberToDisplay && memberToDisplay.teamRoles.length === 2)
                            ? (
                            <>
                                <span className='member badge'>{memberToDisplay && memberToDisplay.teamRoles[0]} / </span>
                                <span className='member badge'>{memberToDisplay && memberToDisplay.teamRoles[1]}</span>
                            </>
                            )
                            : (
                            <>
                                <span className='member badge'>{memberToDisplay && memberToDisplay.teamRoles[0]} / </span>
                                <span className='member badge'>{memberToDisplay && memberToDisplay.teamRoles[1]} / </span>
                                <span className='member badge'>{memberToDisplay && memberToDisplay.teamRoles[2]}</span>
                            </>
                            )
                        }</td>
                    </tr>  
                    <tr> 
                        <td>{memberToDisplay && memberToDisplay.user.email}</td>
                    </tr> 
                </tbody>
            </table>
        </div>
        <div id="middleTables">
            <table id="createdTasks" className={watchingRole === "TASKER" || watchingRole === "GIVER" || (watchingRole === "LEADER" && memberRole === "TASKER") ? "hiddenTable" : ""}>
                <thead>
                    <tr>
                        <th>Tâche(s) crée(s)</th>
                        <th className='button'>
                            <Link className='createTask' to={`/equipes/${id}/taches/${urlTeamRole}`}>
                                <button>Liste</button>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='columnMediumSize'>Titre</td>
                        <td className='columnSmallSize'>Limite réalisation</td>
                        <td className='columnSmallSize'>Assignée à</td>
                    </tr>
                    {tasks && tasks.slice(0, maxTableRows).map((task, index) => (
                        <Link key={index} to={`/equipes/${id}/taches/${task.id}/${urlTeamRole}`}>
                            <tr>
                                {memberToDisplay && memberToDisplay.user.lastname === task.createdBy.lastname && <td className='task columnMediumSize' >{task.title}</td>}
                                {memberToDisplay && memberToDisplay.user.lastname === task.createdBy.lastname && <td className='task columnSmallSize' >{new Date(task.completionDeadline).toLocaleDateString('fr')}</td>}
                                {memberToDisplay && memberToDisplay.user.lastname === task.createdBy.lastname && <td className='task taskAgree columnSmallSize' >{(task.assignedTo) ? task.assignedTo.lastname + ' ' + task.assignedTo.firstname : ''}</td>}
                            </tr>
                        </Link>
                    ))}
                </tbody>
            </table>
            <table id="waitingTasks" className={watchingRole === "TASKER" || (watchingRole === "LEADER" && memberRole === "GIVER") ? "hiddenTable" : ""}>
                <thead>
                    <tr>
                        <th>Tâche(s) en attente(s)</th>
                        <th className='button'>
                            <Link className='createTask' to={`/equipes/${id}/taches/${urlTeamRole}`}>
                                <button>Liste</button>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='columnBigSize'>Titre</td>
                        <td className={`columnSmallSize${watchingRole === "GIVER" ? "GIVER" : ""}`}>Limite acceptation</td>
                    </tr>
                    {tasks && tasks.slice(0, maxTableRows).map((task, index) => (
                        <tr key={index}  id={task.id} >
                            <Link className='lineLink' to={`/equipes/${id}/taches/${task.id}/${urlTeamRole}`}>

                            {(task.status === 1 && 
                                ((task.assignedTo) && 
                                ((memberToDisplay && memberToDisplay.user.lastname === task.assignedTo.lastname) && 
                                memberToDisplay.user.lastname === task.assignedTo.firstname))) ? (
                                 <td className='task columnBigSize'>{task.title}</td>
                            ) : ''}
                            {(task.status === 1 && 
                                ((task.assignedTo) && 
                                ((memberToDisplay && memberToDisplay.user.lastname === task.assignedTo.lastname) && 
                                memberToDisplay.user.lastname === task.assignedTo.firstname))) ? (
                                <td className='task columnSmallSize' >{new Date(task.acceptDeadline).toLocaleDateString('fr')}</td>
                                ) : ''}
                            </Link>
                            {watchingRole && (task.status === 1) === "Giver" ? 
                                <td className='task columnSmallSize editButton'>
                                    <button type='click' onClick={handleOpenWidget}>Editer</button>
                                </td> 
                            : ""}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div id="bottomTable" >
            <table className={watchingRole === "TASKER" || (watchingRole === "LEADER" && memberRole === "GIVER") ? "hiddenTable" : ""}>
                <thead>
                    <tr>
                        <th>Tâche(s) en cour(s)</th>
                        <th className='button'>
                            <Link className='createTask' to={`/equipes/${id}/taches/${urlTeamRole}`}>
                                <button>Liste</button>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='columnBigSize'>Titre</td>
                        <td className='columnSmallSize'>Date de fin</td>
                    </tr>
                    {tasks && tasks.slice(0, maxTableRows).map((task, index) => (
                        <Link key={index} to={`/equipes/${id}/taches/${task.id}/${urlTeamRole}`}>
                            <tr >
                                {(task.status === 2 &&
                                    ((task.assignedTo) && 
                                    ((memberToDisplay && memberToDisplay.user.lastname === task.assignedTo.lastname) && 
                                    memberToDisplay.user.lastname === task.assignedTo.firstname))) ?  (                               
                                    <td className='task columnBigSize' >{task.title}</td>
                                    ) : ''}

                                {(task.status === 2 &&
                                    ((task.assignedTo) && 
                                    ((memberToDisplay && memberToDisplay.user.lastname === task.assignedTo.lastname) && 
                                    memberToDisplay.user.lastname === task.assignedTo.firstname))) ? ( 
                                    <td className='task columnSmallSize' >{new Date(task.completionDeadline).toLocaleDateString('fr')}</td>
                                    ) : ''}
                            </tr>
                        </Link>
                    ))}
                </tbody>
            </table>
            <table className={watchingRole === "TASKER" || (watchingRole === "LEADER" && memberRole === "GIVER") ? "hiddenTable" : ""}>
                <thead>
                    <tr>
                        <th>Tâche(s) terminée(s)</th>
                        <th className='button'>
                            <Link className='createTask' to={`/equipes/${id}/taches/${urlTeamRole}`}>
                                <button>Liste</button>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='columnBigSize'>Titre</td>
                        <td className='columnSmallSize'>Fini le:</td>
                    </tr>
                    {tasks && tasks.slice(0, maxTableRows).map((task, index) => (
                        <Link key={index} to={`/equipes/${id}/taches/${task.id}/${urlTeamRole}`}>
                            <tr >
                                {(task.status === 3 &&
                                    ((task.assignedTo) && 
                                    ((memberToDisplay && memberToDisplay.user.lastname === task.assignedTo.lastname) && 
                                    memberToDisplay.user.lastname === task.assignedTo.firstname))) ? ( 
                                    <td className='task columnBigSize' >{task.title}</td>
                                    ) : ''}

                                {(task.status === 3 &&
                                    ((task.assignedTo) && 
                                    ((memberToDisplay && memberToDisplay.user.lastname === task.assignedTo.lastname) && 
                                    memberToDisplay.user.lastname === task.assignedTo.firstname))) ? ( 
                                    <td className='task columnSmallSize' >{new Date(task.completionDeadline).toLocaleDateString('fr')}</td>
                                    ) : ''}
                            </tr>
                        </Link>
                    ))}
                </tbody>
            </table>
        </div>

        <form onSubmit={handleSubmit} className={`display ${open ? 'open' : ''}`}>
            <h2>Réassigner tâche</h2>

            <section>
                <div>
                    <div>
                        <p className='title'>Titre :</p>
                        <p>{task.title}</p>
                    
                        <p className='title'>Description :</p>
                        <p className='description'>{task.description}</p>
                    
                        <p className='title'>catégorie :</p>
                        <p>{task.category}</p>
                    
                        <p className='title'>difficulté :</p>
                        <p>{task.difficulty}</p>
                    </div>

                    <div>
                        <p className='title'>Echéance d&apos;acceptation</p>
                        <p>{task.accept_deadline}</p>
                    
                        <p className='title'>Echéance de résalisation</p>
                        <p>{task.completition_deadline}</p>
                    
                        <p className='title'>Date de résalisation</p>
                        <p>{task.completed}</p>
                    
                        <p className='title'>Status :</p>
                        <p>{task.status}</p>
                    </div>
                </div>
                
                <p>{`Créé par ${task.creator}`}</p>
                <select>

                    <option>Réassigner à</option>
                    {members && members.slice(0, maxTableRows).map((member, key) =>(member.teamRoles.includes("TASKER") ? (
                    <option key={key}>{member.user.firstname} {member.user.lastname}</option>
                    ):""))}
                    
                </select>
            </section>

                <button type='click' onClick={handleValidateForm}>valider</button>
        </form>            

        <div type='click' onClick={handleCloseWidget} className={`curtain ${open ? 'open' : ''}`}></div>

        
        <section className='actions'>
            <button type='click' onClick={handleReturnClick}>retour</button>
        </section>

    </section>
    )
}

export default MemberPage;