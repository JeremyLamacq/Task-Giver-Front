/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useState } from 'react';

import './TasksListPage.scss';

const TasksListPage = ({ tasks, teamId, teamRoles }) => {

    const handleReturnClick = () => {
        window.history.back();
    };

/************** Filter roles: Leader / Giver / Tasker *********/

const [roleFilter, setRoleFilter] = useState('');

const leaderFilter = () => {
  setRoleFilter('Leader');
};

const giverFilter = () => {
  setRoleFilter('Giver');
};

const taskerFilter = () => {
  setRoleFilter('Tasker');
};

/************** Filter on going, unassigned, done tasks *********/

    const [onGoing, setOnGoing] = useState(false);
    const [unAssigned, setUnAssigned] = useState(false);
    const [done, setDone] = useState(false);
    
    const onGoingFilter = () => {
        setOnGoing(true);
        setUnAssigned(false);
        setDone(false);
    }

    const unAssignedFilter = () => {
        setUnAssigned(true);
        setDone(false);
        setOnGoing(false);
    }

    const doneFilter = () => {
        setDone(true);
        setUnAssigned(false);
        setOnGoing(false);
    }

    const resetFilters = () => {
        setDone(false);
        setUnAssigned(false);
        setOnGoing(false);
    }
    
    const filteredTasks = tasks.filter((task) => {     
        return (
            (!unAssigned || task.status === 0) &&
            (!onGoing || ((task.status === 2) || (task.status === 1))) &&
            (!done || task.status === 3)
        );
    });

/**************************************************************/
    
    return (
        <section id="tasksListPage">
        <h1>Liste des tâches</h1>

        <div id="selectRole">
            <label htmlFor="roleSelect">En tant que:</label>

        <select
            name="roles"
            id="roleSelect"
            onChange={(e) => {
            const selectedValue = e.target.value;
                selectedValue === "Leader"
                ? leaderFilter()
                : selectedValue === "Giver"
                ? giverFilter()
                : selectedValue === "Tasker"
                ? taskerFilter()
                : resetFilters();
            }}
        >

          <option value="">Sélectionner un rôle</option>
          <option value="Leader">Leader</option>
          <option value="Giver">Giver</option>
          <option value="Tasker">Tasker</option>
        </select>
        </div>
        <table>
            <thead>
                <tr id="tasksListTableHeader">
                    <th>Liste des tâches</th>
                    <td>
                    <select name="status" id="statusSelect" 
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        selectedValue === "allTasks"
                        ? resetFilters()
                        : selectedValue === "onGoing"
                        ? onGoingFilter()
                        : selectedValue === "unAssigned"
                        ? unAssignedFilter()
                        : selectedValue === "done"
                        ? doneFilter()
                        : ''; 
                        }}
                    >
                        <option value="" >Status</option>
                        <option value="allTasks">Voir tous</option>
                        <option value="unAssigned"  className={onGoing ? "active" : ""} >En attente</option>
                        <option value="onGoing"  className={unAssigned ? "active" : ""}>En cours</option>
                        <option value="done"  className={done ? "active" : ""}>Terminé</option>
                    </select>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Titre</td>
                    <td>Statut</td>
                    <td>Catégorie</td>
                    <td className='media'>Créateur</td>
                    <td className='media'>Tasker</td>
                </tr>
                {filteredTasks.map((task, index) => (
                    
                        <tr key={index}> 
                            <td className='task' ><Link  to={`/equipes/${teamId}/taches/${task.id}/${teamRoles}?`}>{task.title}</Link></td>
                            <td className='task'><Link  to={`/equipes/${teamId}/taches/${task.id}/${teamRoles}?`}>
                                {task.status === 0
                                    ? "Non assigné"
                                    : task.status === 1
                                    ? "assigné"
                                    : task.status === 2
                                    ? "En cours"
                                    : task.status === 3
                                    ? "Terminé"
                                    : "Refusé"}
                                </Link></td>
                            <td className='task' ><Link  to={`/equipes/${teamId}/taches/${task.id}/${teamRoles}?`}>{(task.category) ? task.category.name: ''}</Link></td>
                            <td className='task media' ><Link  to={`/equipes/${teamId}/taches/${task.id}/${teamRoles}?`}>{(task.createdBy) ? task.createdBy.lastname + ' ' + task.createdBy.firstname : ''}</Link></td>
                            <td className='task media' ><Link  to={`/equipes/${teamId}/taches/${task.id}/${teamRoles}?`}>{(task.assignedTo) ? task.assignedTo.lastname + ' ' + task.assignedTo.firstname : ''}</Link></td>
                        </tr>
                    
                ))}
            </tbody>
        </table>

        <section className='actions'>
                <button type='click' onClick={handleReturnClick}>retour</button>
            </section>
        
    </section>
    )
}

export default TasksListPage;