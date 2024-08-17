/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { createTask } from '../../api/apiTasks';

import './TaskCreator.scss';



const TaskCreator = ({token, categories, members, teamId}) => {

    const navigate = useNavigate();

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [taskDifficulty, setDifficulty] = useState();
    const [acceptDeadline, setAcceptDeadline] = useState();
    const [completitionDeadline, setCompletitionDeadline] = useState();
    const [assignate, setAssignate] = useState();

    /**
     * 
     * @param {*} e 
     */
    const handleCreateTask = async(e) => {
        e.preventDefault();
        try {
            if (token) {
                const taskData = {
                    title: title,
                    category: parseInt(category),
                    description: description,
                    difficulty: parseInt(taskDifficulty),
                    acceptDeadline: acceptDeadline,
                    completionDeadline: completitionDeadline,
                    assignedTo: parseInt(assignate)
                };
            const createdTask = await createTask(taskData, token, teamId);
            console.log("Tâche créée avec succès :", taskData.title);
            navigate(`/equipes/${teamId}/giverboard`);
        }
        } catch (error) {
          console.error("Erreur lors de la création de la tâche :", error);
        }
    }

    const handleValidateCreateTask = () => {
        handleCreateTask();
    }

    const handleReturnClick = () => {
        window.history.back();
    }

    return (
        <form id='taskCreator' onSubmit={handleCreateTask}>

            <h1>Création de tâche</h1>

            <section className='create'>
                <div>
                    <input type='text' placeholder='Titre' onChange={(e) => setTitle(e.target.value)}/>
                    <textarea type='text' placeholder='Description' onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <select onChange={(e) => setCategory(e.currentTarget.value)}>
                        <option>Catégorie</option>
                        {categories.map((category, key) => 
                            <option key={key} value={category.id}>{category.name}</option>
                        )}
                    </select>
                    <select onChange={(e) => setDifficulty(e.target.value)}>
                        <option>Difficulté</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <div>
                        <div>
                            <p>Echéance d&apos;acceptation</p>
                            <input type='date' placeholder="Echéance d'acceptation" onChange={(e) => setAcceptDeadline(e.target.value)}/>
                        </div>
                        <div>
                            <p>Echéance de résalisation</p>
                            <input type='date' placeholder='Echéance de réalisation' onChange={(e) => setCompletitionDeadline(e.target.value)}/>
                        </div>
                    </div>
                </div>
            </section>         

            <section className='assignment'>
                <p>Assigner à :</p>
                <select onChange={(e) => {setAssignate(e.target.value)}}>
                    <option>Réassigner à</option>
                    {members.map((member, key) => (member.teamRoles.includes("TASKER") ? (
                        <option key={key} value={member.user.id}> {member.user.lastname} {member.user.firstname}</option>
                    ):""))}
                </select>
            </section>

            <section className='actions'>
                <button type='click' onSubmit={handleValidateCreateTask}>Valider</button>
                <button type='click' onClick={handleReturnClick}>retour</button>
            </section>

        </form>
    )
}

export default TaskCreator;