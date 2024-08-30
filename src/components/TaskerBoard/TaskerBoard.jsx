/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useState } from 'react';

import {AiOutlineCheckSquare} from 'react-icons/ai';
import {TiDeleteOutline} from 'react-icons/ti';

import { acceptedTask } from '../../api/apiTasks';

import './TaskerBoard.scss';

const TaskerBoard = ({tasks, setTasks, maxTableRows, urlTeamRole, teamId, token }) => {

    const [open, setOpen] = useState (false);
    const [element, setElement] = useState('');
    const [taskId, setTaskId] = useState('');

    /**
     * 
     * @param {*} e 
     */
    const handleOpenWidget = (e) => {
        setElement(e.currentTarget.className);
        setOpen((prevstate) => !prevstate);
        setTaskId(e.target.closest('tr').id);

    }

    /**
     * 
     * @param {*} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        acceptedTask(taskId, token)
            .then((success) => {
                const message = success
                    ? 'Tâche acceptée avec succès'
                    : 'Échec de l\'acceptation de la tâche';
                console.log(message);
                setOpen(false);
                setTasks([...tasks, tasks])
                window.location.reload();
            })
        .catch((error) => {
                console.error('Erreur lors de l\'acceptation de la tâche', error);
            });
    }

    /**
     * 
     * @param {*} e 
     */
    const handleRefuse = (e) => {
        e.preventDefault();

        acceptedTask(taskId, token)
            .then((success) => {
                const message = success
                    ? 'Tâche refusé avec succès'
                    : 'Échec du refus de la tâche';
                console.log(message);
                setOpen(false);
                setTasks([...tasks, tasks])
                window.location.reload();
            })
        .catch((error) => {
                console.error('Erreur lors du refus de la tâche', error);
            });
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
        <section id="taskerBoard">
            <h1>Tasker board</h1>

            <table id="topTable">
                <thead>
                    <tr>
                        <th>Tâches en attente</th>
                        <th className='button'>

                            <Link className='createTask' to={`/equipes/${teamId}/taches/${urlTeamRole}?`}>
                            {(tasks) && <button>Liste</button>}


                            </Link>
                        </th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr>
                        <td className='columnMediumSize'>Titre</td>
                        <td className='columnSmallSize'>Limite acceptation</td>
                        <td className='columnSmallSize'>Accord</td>
                    </tr>
                    
                    {(tasks) && tasks.slice(0, maxTableRows).map((task, index) => (
                        <tr key={index} id={task.id}>
                            
                            {(task.status === 1) &&<td className='task columnMediumSize' ><Link className='lineLink' to={`/equipes/${teamId}/taches/${task.id}/${urlTeamRole}?`}>{task.title}</Link></td>}
                            {(task.status === 1) &&<td className='task columnSmallSize' ><Link className='lineLink' to={`/equipes/${teamId}/taches/${task.id}/${urlTeamRole}?`}>{new Date(task.acceptDeadline).toLocaleDateString('fr')}</Link></td>}
                            
                            { (task.status === 1) && 
                            <td className='task taskAgree columnSmallSize' >
                                <button className='update' type='click' onClick={handleOpenWidget}><AiOutlineCheckSquare color="#495867"/></button>
                                <button className='delete' type='click' onClick={handleOpenWidget}><TiDeleteOutline color="#FE5F55"/></button>
                            </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            <div id="bottomTable">

                <table>
                    <thead>
                        <tr>
                            <th>Tâches en cours</th>
                            <th className='button'>
                                <Link className='createTask' to={`/equipes/${teamId}/taches/${urlTeamRole}?`}>
                                {(tasks) && <button>Liste</button>}
                                </Link>
                            </th>
                        </tr>
                    </thead>
        
                    <tbody>
                        <tr>
                            <td className='columnBigSize'>Titre</td>
                            <td className='columnSmallSize'>Date de fin</td>
                        </tr>
                        {(tasks) && tasks.slice(0, maxTableRows).map((task, index) => (
                            
                                <tr key={index}>
                                    {(task.status === 2) &&<td className='task columnBigSize' ><Link  to={`/equipes/${teamId}/taches/${task.id}/${urlTeamRole}?`}>{task.title}</Link></td>}
                                    {(task.status === 2) &&<td className='task columnSmallSize'><Link  to={`/equipes/${teamId}/taches/${task.id}/${urlTeamRole}?`}>{new Date(task.completionDeadline).toLocaleDateString('fr')}</Link></td>}
                                </tr>
                            
                        ))}
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>Tâches terminées</th>
                            <th className='button'>
                                <Link className='createTask' to={`/equipes/${teamId}/taches/${urlTeamRole}?`}>
                                {(tasks) && <button>Liste</button>}
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='columnBigSize'>Titre</td>
                            <td className='columnSmallSize'>Fini le:</td>
                        </tr>
                        {(tasks) && tasks.slice(0, maxTableRows).map((task, index) => (
                            
                                <tr key={index}>
                                    {(task.status === 3) && <td className='task columnBigSize' ><Link  to={`/equipes/${teamId}/taches/${task.id}/${urlTeamRole}?`}>{task.title}</Link></td> } 
                                    {(task.status === 3) && <td className='task columnSmallSize' ><Link  to={`/equipes/${teamId}/taches/${task.id}/${urlTeamRole}?`}>{new Date(task.completionDeadline).toLocaleDateString('fr')}</Link></td> }
                                </tr>
                            
                        ))}
                    </tbody>
                </table>

            </div>

            <form onSubmit={element === 'update' ? handleSubmit : element === 'delete' ? handleRefuse : ""} className={`display ${open ? 'open' : ''}`}>
            {element === 'update' && (
                <>
                    <h2>Acceptation</h2>
                    <p>Êtes-vous sur d&apos;accepter ?</p>
                    <button type='click' onClick={handleValidateForm} >Valider</button>
                </>
            )}
            {element === 'delete' && (
                <>
                    <h2>Refus</h2>
                    <p>Êtes-vous sur de vouloir refuser ?</p>
                    <button type='click' onClick={handleValidateForm} >Valider</button>
                </>
            )}
            </form>            

            <div type='click' onClick={handleCloseWidget} className={`curtain ${open ? 'open' : ''}`}></div>


        </section>
    )
}

export default TaskerBoard;