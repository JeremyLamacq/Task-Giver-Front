/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {BiSolidPencil} from 'react-icons/bi';
import {TiDeleteOutline} from 'react-icons/ti';
import { deleteTeam, updateTeam, fetchTeamById } from '../../api/apiTeams';
import { createCategory, updateCategory, fetchCategoryById, deleteCategory } from '../../api/apiCategories';
import { addMemberToTeam, deleteMemberFromTeam, fetchMemberById, searchMember, updateTeamMember } from '../../api/apiMembers';

import { Link } from 'react-router-dom';

import './LeaderBoard.scss';
import { useState, useCallback } from 'react';

const LeaderBoard = ({members, setMembers, categories, setCategories, tasks, maxTableRows, token, teamId, teamRoles, urlTeamRole, setTeamId, teams, setTaskId}) => {
  
    const [open, setOpen] = useState (false)
    const [element, setElement] = useState('');
    const [memberId, setMemberId] = useState("");
    const [action, setAction] = useState('create');
    const [memberEmail, setMemberEmail] = useState("");
    const [memberSearched, setMemberSearched] = useState("");
    const [addMemberSearchedId, setAddMemberSearchedId] = useState("");
    const [currentElement, setCurrentElement] = useState('');
    const [teamToUpdate, setTeamToUpdate] = useState({title: '', description: '',});
    const [memberIdForDelete, setMemberIdForDelete] = useState("");
    const [addMemberTeamRole, setAddMemberTeamRole] = useState([]);
    const [categoryIdToUpdate, setCategoryIdToUpdate] = useState('');
    const [categoryNameToUpdate, setCategoryNameToUpdate] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryIdToDelete, setCategoryIdToDelete ] = useState("");


/**************************** Member ********************************/

    /***SEARCH a member by email***/
    /**
     * 
     * @param {*} e 
     */
    const handleSearchMember = async(e) => {  
        e.preventDefault();
        try {           
            if (token) {
                const searchMemberData = {
                    "email": memberEmail
                };
                const searchedMember = await searchMember(searchMemberData, token);
                setOpen(false)           
                if(searchedMember) {
                
                setAddMemberSearchedId(searchedMember[0].id);
                setMemberSearched(searchedMember);
                
                setMemberEmail('');
                setTimeout(() => {
                    setElement('addMember')
                    setOpen(true)
                }, 1000);
                }

              } else {
                console.error('Échec de la récupération des données du membre');
              }
        } catch (error) {
            console.error('Erreur lors de la récupération des données du membre :', error);
        }
    }

    /***ADD member to current team***/
    /**
     * 
     * @param {*} event 
     */
    const handleAddMemberToTeam = async(event) => {
        event.preventDefault();

        const newMemberToDisplay = {
            user: {
                id: memberSearched[0].id,
                lastname: memberSearched[0].lastname,
                firstname: memberSearched[0].firstname
            },
            teamRoles: addMemberTeamRole
          };

        try {
            if (token) {
                const newMember = {
                    user: addMemberSearchedId,
                    teamRoles: {addMemberTeamRole}
                };

                const addMember = await addMemberToTeam(newMember, teamId, token);
            console.log("membre ajouté avec succès ");

            setOpen(false);
            setMembers([...members, newMemberToDisplay]);
          }
        } catch (error) {
          console.error("Erreur lors de la création de l'équipe :", error);
        }
    }
    
    /***DELETE team member***/
    /**
     * 
     * @param {*} event 
     */
    const handleDeleteMemberFromTeam = (event) => {

        const memberId = memberIdForDelete;
        setOpen((prevstate) => !prevstate);
        event.preventDefault();

        const updatedMembers = members.filter((member) => member.user.id != memberId);
        setMembers(updatedMembers) 

        deleteMemberFromTeam(teamId, memberId, token)
            .then((success) => {
                const message = success
                    ? 'Membre supprimée avec succès'
                    : 'Échec de la suppression du membre';
    
                console.log(message);
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression du membre', error);
            });
    }

    /***UPDATE team member***/
    /**
     * 
     * @param {*} event 
     */
    const handleUpdateTeamMember = async(event) => {
        event.preventDefault();

        try {
            if (token) {
                const updatedTeamMemberData = {
                    "teamRoles": addMemberTeamRole
                };
                const updatedTeamMember = await updateTeamMember(teamId, memberId, updatedTeamMemberData, token);
          console.log("Membre mise à jour avec succès ");
          setOpen(false);
          
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du membre :", error);
      }
    }

/**************************** Category ********************************/
    
    /***add Category ***/
    /**
     * 
     * @param {*} event 
     */
    const handleSubmitCategory = async (event) => {
        event.preventDefault();
        try {
            if (token) {
                const newCategoryData = {
                    name: categoryName,
                };
            const createdCategory = await createCategory(newCategoryData, token, teamId);
            console.log("Catégorie créée avec succès :", categoryName, teamId);
            setCategoryName("");
            setOpen(false);
            setCategories([...categories, newCategoryData]);
            }
        } catch (error) {
          console.error("Erreur lors de la création de l'équipe :", error);
        }
    };

    /***UPDATE category***/
    /**
     * 
     * @param {*} event 
     */
    const handleUpdateCategory = async (event) => {
          event.preventDefault();
          const categoryId = categoryIdToUpdate;
          try {
              if (token) {
                  const updatedCategoryData = {
                      name: categoryNameToUpdate,
                    };
            const updatedCategory = await updateCategory(teamId, categoryId, updatedCategoryData, token,);
            console.log("Catégorie mise à jour avec succès :", updatedCategoryData.name);
            setCategoryNameToUpdate(""); 
            setOpen(false);
            
            const updatedCategories = categories.map((category) =>
              category.id === categoryIdToUpdate ? updatedCategoryData : category
            );
            setCategories(updatedCategories);
          }
        } catch (error) {
          console.error("Erreur lors de la mise à jour de la catégorie :", error);
        }
    };

    /***category Form completion ***/
    /**
     * 
     * @param {*} e 
     */
    const handleEditCategory = async (e) => {
        const categoryId = e.currentTarget.getAttribute('data-category-id');

        try {
            const currentCategory = await fetchCategoryById(teamId, categoryId, token);
      
            if (currentCategory) { 
                
                setCategoryIdToUpdate(categoryId);
                setCategoryNameToUpdate(currentCategory.name);
                handleOpenWidget({ currentTarget: { className: 'updateCategory' } });
                } else {
                console.error('Échec de la récupération des données de la catégorie');
                }
        } catch (error) {
            console.error('Erreur lors de la récupération des données de la catégorie :', error);
        }
    };

    /***DELETE category***/
    /**
     * 
     * @param {*} event 
     */
    const handleDeleteCategory = (event) => {
        setOpen((prevstate) => !prevstate);
        const categoryId = categoryIdToDelete;
     
        event.preventDefault();
        deleteCategory(teamId, categoryId, token)
            .then((success) => {
                const message = success
                    ? 'Catégorie supprimée avec succès'
                    : 'Échec de la suppression de la catégorie';

                const updatedCategories = categories.filter((category) => category.id != categoryId);
                setCategories(updatedCategories) 
    
                console.log(message);
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de la catégorie', error);
            });
    }
      
/****************************** Team *********************************/

    /***DELETE team***/
    /**
     * 
     */
    const handleDeleteTeam = useCallback((e) => {
        setOpen((prevstate) => !prevstate);
        e.preventDefault();
        deleteTeam(teamId, token)
            .then((success) => {
                const message = success
                    ? 'Équipe supprimée avec succès'
                    : 'Échec de la suppression de l\'équipe';
    
                console.log(message);
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de l\'équipe', error);
            });
    }, [teamId, token]);

    /***UPDATE team***/
    /**
     * 
     * @param {*} e 
    */
    const handleUpdateTeam = async (e) => {
        setOpen((prevstate) => !prevstate);
        e.preventDefault();
        
        const updatedTeamData = {
            title: teamToUpdate.title,
            description: teamToUpdate.description
        };
        
        try {
            const success = await updateTeam(teamId, updatedTeamData, token);
            const message = success
                ? 'Équipe mise à jour avec succès'
                : 'Échec de la mise à jour de l\'équipe';
            console.log(message);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'équipe', error);
        }
    };
    
    /***team Form completion ***/
    /**
     * 
     */
    const handleEditTeam = async () => {

        try {
            const currentTeam = await fetchTeamById(teamId, token);
            
            if (currentTeam && currentTeam.title && currentTeam.description) {
                setTeamToUpdate({
                    title: currentTeam.title,
                    description: currentTeam.description,
                    
                });
                
                handleOpenWidget({ currentTarget: { className: 'updateTeam' } });
            } else {
                console.error('Échec de la récupération des données de l\'équipe');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'équipe :', error);
        }
    };

/********************************Widgets Form ************************************/
    /**
     * 
     * @param {*} e 
     */
    const multiClick = (e) => {
        const memberUpdateId = e.currentTarget.getAttribute('data-member-update-id');
        memberUpdateId && setMemberId(memberUpdateId);
        
        const memberDeleteId = e.currentTarget.getAttribute('data-member-id');
        memberDeleteId && setMemberIdForDelete(memberDeleteId);

        const categoryDeletedId =  e.currentTarget.getAttribute('data-delete-category');
        categoryDeletedId && setCategoryIdToDelete(categoryDeletedId);

        handleOpenWidget(e);
    }
    
    /**
     * 
     * @param {*} e 
     */
    const handleOpenWidget = (e) => {
              
        const conditionElement = e.currentTarget.className;
        setElement(conditionElement)
        setOpen(true);
    };

    /**
     * 
     */
    const handleValidateForm = async () => {
        setOpen((prevstate) => !prevstate);
    };

    /**
     * 
     * @returns 
     */
    const handleCloseWidget = async () => {
        return setOpen((prevstate) => !prevstate);
    }

    /**
     * 
     * @param {*} actionType 
     */
    const setFormAction = (actionType) => {
        setAction(actionType);
    };


    return (
        <section id="leaderBoard">
            <h1>Leader board</h1>
            <div id="topTables">
                <table>
                    <thead>
                        <tr>
                            <th>Liste des membres</th>
                            <th>
                                <Link to={`/equipes/${teamId}/membres`}>
                                {(members) && <button>Liste</button>}
                                </Link>
                                <button type='click' onClick={handleOpenWidget} className='searchMember'>Ajouter</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="memberColumnSize tableHeadColor">Nom</td>
                            <td className="memberColumnSize tableHeadColor">Prénom</td>
                            <td className="actionColumnSize tableHeadColor">Actions</td>
                        </tr>
                        {members && members.slice(0, maxTableRows).map((member, index) => (
                            <tr key={index} id='provisional' className='lineLink'>

                                    <td className="member memberColumnSize"><Link className='lineLink' to={`/equipes/${teamId}/membres/${member.user.id}`}>{member.user.lastname}</Link></td>
                                    <td className="member memberColumnSize"><Link className='lineLink' to={`/equipes/${teamId}/membres/${member.user.id}`}>{member.user.firstname}</Link></td>
                                  
                                <td className="action actionColumnSize">
                                    <button className='updateMember' type='click' data-member-update-id={member.user.id} onClick={multiClick}><BiSolidPencil color="#495867"/></button>
                                    <button className='deleteMember' 
                                        type='button' 
                                        data-member-id={member.user.id}
                                        onClick={multiClick}>
                                        <TiDeleteOutline color="#FE5F55"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>Liste des catégories</th>
                            <th>
                                <Link to={`/equipes/${teamId}/categories`}>
                                {(categories) && <button>Liste</button>}
                                </Link>
                                <button type='click' onClick={handleOpenWidget} className='categories'>Ajouter</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="categoryColumnSize tableHeadColor">Nom</td>
                            <td className="actionColumnSize tableHeadColor">Actions</td>
                        </tr>
                        {(categories) && categories.slice(0, maxTableRows).map((category, index) => (
                            <tr key={index} id='provisional'>
                                
                                    <td className="category categoryColumnSize"><Link className='lineLink' to={`/equipes/${teamId}/categories`}>{category.name}</Link></td>
                                 
                                <td className="action actionColumnSize">
                                    <button  className='updateCategory'data-category-id={category.id} type='click' onClick={handleEditCategory}><BiSolidPencil color="#495867"/></button>
                                    <button className='deleteCategory' data-delete-category={category.id} type='click' onClick={multiClick}><TiDeleteOutline color="#FE5F55"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Liste des tâches</th>
                        <th>
                            <Link to={`/equipes/${teamId}/taches/${urlTeamRole}?`}>
                            {(tasks) && <button>Liste</button>}
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="tableHeadColor">Titre</td>
                        <td className="tableHeadColor">Status</td>
                        <td className="tableHeadColor">Catégorie</td>
                        <td className='media tableHeadColor'>Assigné à</td>
                        <td className='media tableHeadColor'>Limite acceptation</td>
                        <td className='media tableHeadColor'>Limite réalisation</td>
                    </tr>

                    {(tasks) && tasks.slice(0, maxTableRows).map((task, index) => (
                        
                            <tr key={index}>

                                <td className="task" ><Link  to={`/equipes/${teamId}/taches/${task.id}/${teamRoles}?`}>{task.title}</Link></td>
                                <td className="task" ><Link  to={`/equipes/${teamId}/taches/${task.id}/${teamRoles}?`}>
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
                                <td className="task" ><Link  to={`/equipes/${teamId}/taches/${task.id}/${teamRoles}?`}>{(task.category) ? task.category.name: ''}</Link></td>
                                <td className="task media" ><Link  to={`/equipes/${teamId}/taches/${task.id}/${teamRoles}?`}>{(task.assignedTo) ? task.assignedTo.lastname + ' ' + task.assignedTo.firstname : ''}</Link></td>
                                <td className="task media" ><Link  to={`/equipes/${teamId}/taches/${task.id}/${teamRoles}?`}>{new Date(task.acceptDeadline).toLocaleDateString('fr')}</Link></td>
                                <td className="task media" ><Link  to={`/equipes/${teamId}/taches/${task.id}/${teamRoles}?`}>{new Date(task.completionDeadline).toLocaleDateString('fr')}</Link></td>
                            </tr>
                        
                    ))}
                </tbody>
            </table>
            <div id="bottomButton">
                <button id='updateTeamButton' className='updateTeam' type='button' onClick={handleEditTeam}>Modifier équipe</button>
                <button id='deleteTeamButton' className='delete' type='click' onClick={handleOpenWidget}>Supprimer équipe</button>
            </div>

            <form 
                onSubmit={
                    action === 'create'
                    ? handleSubmitCategory
                    : action === 'updateTeam'
                    ? handleUpdateTeam
                    : action === 'delete'
                    ? handleDeleteTeam
                    : action === 'updateCategory'
                    ? handleUpdateCategory
                    : action === 'deleteCategory'
                    ? handleDeleteCategory
                    : action === 'searchMember'
                    ? handleSearchMember
                    : action === 'addMember'
                    ? handleAddMemberToTeam
                    : action === 'deleteMember'
                    ? handleDeleteMemberFromTeam
                    : action === 'updateMember'
                    ? handleUpdateTeamMember
                    : null
                } 
                className={`display ${open ? 'open' : ''}`}>
                {(() => {
                    switch (element) {
                    case 'searchMember':
                        return (
                        <>
                            <h2>Ajouter Membre</h2>
                            <input 
                                type='text' 
                                name='memberEmail' 
                                value={memberEmail}
                                onChange={(e) => setMemberEmail(e.target.value)}
                                placeholder='e-mail de la personne à assigner'
                            />

                            <button onClick={() => setFormAction('searchMember')}>Valider</button>
                        </>
                        );
                    case 'updateMember' :
                    return (
                    <>
                        <h2>Modification des rôles du membre</h2>
                        <div>
                            <p>Sélectionnez les rôles d&apos;équipe :</p>
                            <label>
                                <input
                                    type="checkbox"
                                    name="updateMemberTeamRole"
                                    value="GIVER"
                                    checked={addMemberTeamRole.includes('GIVER')}
                                    onChange={(e) => {
                                        if (e.target.checked && !addMemberTeamRole.includes('GIVER')) {
                                        setAddMemberTeamRole([...addMemberTeamRole, 'GIVER']);
                                        } else if (!e.target.checked) {
                                        setAddMemberTeamRole(addMemberTeamRole.filter((role) => role !== 'GIVER'));
                                        }
                                    }}
                                />
                                Giver
                            </label>
                            <br />
                            <label>
                                <input
                                    type="checkbox"
                                    name="updateMemberTeamRole"
                                    value="TASKER"
                                    checked={addMemberTeamRole.includes('TASKER')}
                                    onChange={(e) => {
                                        if (e.target.checked && !addMemberTeamRole.includes('TASKER')) {
                                        setAddMemberTeamRole([...addMemberTeamRole, 'TASKER']);
                                        } else if (!e.target.checked) {
                                        setAddMemberTeamRole(addMemberTeamRole.filter((role) => role !== 'TASKER'));
                                        }
                                    }}
                                />
                                Tasker
                            </label>
                        </div>
                        <p>Confirmez-vous la modification ?</p>
                        <button
                                onClick={() => {                 
                                    if (addMemberTeamRole.includes("TASKER") || addMemberTeamRole.includes ("GIVER") ) {
                                setFormAction('updateMember');
                                } else {
                                alert('Veuillez sélectionner au moins un rôle d\'équipe.');
                                }
                                }}
                            >Valider</button>
                    </>
                    );
                    case 'addMember' :
                        return (
                        <>
                            <h2>Ajout du Membre</h2>
                            <p>Nom: {memberSearched[0].lastname}</p>
                            <p>Prénom: {memberSearched[0].firstname}</p>
                            <div>
                                <p>Sélectionnez les rôles d&apos;équipe :</p>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="addMemberTeamRole"
                                        value="GIVER"
                                        checked={addMemberTeamRole.includes('GIVER')}
                                        onChange={(e) => {
                                            if (e.target.checked && !addMemberTeamRole.includes('GIVER')) {
                                            setAddMemberTeamRole([...addMemberTeamRole, 'GIVER']);
                                            } else if (!e.target.checked) {
                                            setAddMemberTeamRole(addMemberTeamRole.filter((role) => role !== 'GIVER'));
                                            }
                                        }}
                                    />
                                    Giver
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="checkbox"
                                        name="addMemberTeamRole"
                                        value="TASKER"
                                        checked={addMemberTeamRole.includes('TASKER')}
                                        onChange={(e) => {
                                            if (e.target.checked && !addMemberTeamRole.includes('TASKER')) {
                                            setAddMemberTeamRole([...addMemberTeamRole, 'TASKER']);
                                            } else if (!e.target.checked) {
                                            setAddMemberTeamRole(addMemberTeamRole.filter((role) => role !== 'TASKER'));
                                            }
                                        }}
                                    />
                                    Tasker
                                </label>
                            </div>
                            <p>Confirmez-vous l&apos;ajout ?</p>
                            <button
                                onClick={() => {                 
                                    if (addMemberTeamRole.includes("TASKER") || addMemberTeamRole.includes ("GIVER") ) {
                                setFormAction('addMember');
                                } else {
                                alert('Veuillez sélectionner au moins un rôle d\'équipe.');
                                }
                                }}
                            >Valider</button>
                        </>
                        );
                    case 'deleteMember':
                    return (
                    <>
                        <h2>Suppression</h2>
                        <p>Veuillez confirmer la suppression du membre</p>
                        <button onClick={() => setFormAction('deleteMember')}>Valider</button>
                    </>
                    )
                    case 'categories':
                        return (
                        <>
                            <h2>Ajouter une catégorie</h2>
                            <input 
                                type='text' 
                                name='addCategories' 
                                placeholder='nom de la catégorie'
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />

                            <button onClick={() => setFormAction('create')}>Valider</button>
                        </>
                        );
                    case 'updateCategory':
                        return (
                        <>
                            <h2>Mise à jour de la catégorie</h2>
                            <input 
                                type='text'
                                name="updateCategory"
                                value={categoryNameToUpdate}
                                
                                onChange={(e) =>
                                setCategoryNameToUpdate(e.target.value)
                                }
                            />
                            <button onClick={() => setFormAction('updateCategory')}>Valider</button>
                        </>
                        );
                    case 'deleteCategory':
                        return (
                        <>
                            <h2>Suppression</h2>
                            <p>Cette action effectuera une suppression définitive de la catégorie</p>
                            <button onClick={() => setFormAction('deleteCategory')}>Valider</button>
                        </>
                        )
                    case 'update':
                        return (
                        <>
                            <h2>Mise à jour du rôle</h2>
                            <select name="roles" id="roleSelect">
                            <option value="">Selectionner un ou des rôles</option>
                            <option value="Giver">Giver</option>
                            <option value="Giver / Tasker">Giver / Tasker</option>
                            <option value="Tasker">Tasker</option>
                            </select>
                            <button type='button' onClick={() => handleValidateForm(currentElement)}>Valider</button>
                        </>
                        );
                    case 'delete':
                        return (
                        <>
                            <h2>Suppression</h2>
                            <p>Cette action effectuera une suppression définitive de l&apos;équipe</p>
                            <button onClick={() => setFormAction('delete')}>Valider</button>
                        </>
                        );
                    case 'updateTeam':
                        return (
                        <>
                            <h2> Mise à jour de l&apos;équipe </h2>
                            <input
                            type='text'
                            name='title'
                            placeholder='Nouveau nom de l&apos;equipe'
                            value={teamToUpdate.title}
                            onChange={(e) =>
                                setTeamToUpdate({
                                ...teamToUpdate,
                                title: e.target.value,
                                })
                            }
                            />
                            <textarea
                            type='text'
                            name='description'
                            placeholder='description de l&apos;équipe'
                            value={teamToUpdate.description}
                            onChange={(e) =>
                                setTeamToUpdate({
                                ...teamToUpdate,
                                description: e.target.value,
                                })
                            }
                            ></textarea>
                            <button onClick={() => setFormAction('updateTeam')}>Valider</button>
                        </>
                        );
                    default:
                        return null; 
                    }
                })()}
            </form>
            <div type='click' onClick={handleCloseWidget} className={`curtain ${open ? 'open' : ''}`}></div>

            
        </section>
    )
}

export default LeaderBoard;