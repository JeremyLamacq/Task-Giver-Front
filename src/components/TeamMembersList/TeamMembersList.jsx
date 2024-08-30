/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useState } from 'react';

import './TeamMembersList.scss';
import { addMemberToTeam, deleteMemberFromTeam, fetchMemberById, searchMember, updateTeamMember } from '../../api/apiMembers';

import {BiSolidPencil} from 'react-icons/bi';
import {TiDeleteOutline} from 'react-icons/ti';
import {AiOutlineFileAdd} from "react-icons/ai";



const TeamMembersList = ( { members, setMembers, categories, teamId, token } ) => {

    const [open, setOpen] = useState (false);
    const [action, setAction] = useState('create');
    const [element, setElement] = useState('');
    const [memberEmail, setMemberEmail] = useState("");
    const [memberSearched, setMemberSearched] = useState("");
    const [addMemberTeamRole, setAddMemberTeamRole] = useState([]);
    const [addMemberSearchedId, setAddMemberSearchedId] = useState("");
    const [memberSearchedFirstname, setMemberSearchedFirstname] = useState("");
    const [memberSearchedLastname, setMemberSearchedLastname] = useState("");
    const [memberSearchedId, setMemberSearchedId] = useState("");
    const [memberSearchedTeamRole,  setMemberSearchedTeamRole] = useState("");
    const [memberId, setMemberId] = useState("");

    const title = "Membres d'équipe";
    const tableTitle = "Membres";

    const role = "Leader";

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
                    "user": addMemberSearchedId,
                    "teamRoles": addMemberTeamRole
                };
            const addMember = await addMemberToTeam(newMember, teamId, token);
            console.log("membre ajouté avec succès ");

            fetchMemberDetails();
            setOpen(false);
            setMembers([...members, newMemberToDisplay]);
          }
        } catch (error) {
          console.error("Erreur lors de la création de l'équipe :", error);
        }
    }

    /**
     * 
     * @param {*} event 
     */
    const handleDeleteMemberFromTeam = (event) => {
        
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
    
    /**
     * 
     * @returns 
     */
    const fetchMemberDetails = async () => {
        try {
            const memberDetails = await fetchMemberById(teamId, memberId, token); 
            console.log("membre recherché ok ");
            setMemberSearchedFirstname(memberDetails[0].user.firstname);
            setMemberSearchedLastname(memberDetails[0].user.lastname)
            setMemberSearchedId(memberDetails[0].user.id)
            setMemberSearchedTeamRole(memberDetails[0].teamRoles)
           
        } catch (error) {
            console.error("Erreur lors de la récupération des détails du membre :", error);
            return null;
        }
    };

    /**
     * 
     * @param {*} event 
     */
    const handleUpdateTeamMember = async(event) => {
        event.preventDefault();
        await fetchMemberDetails();
        
        const resetedMemberId = parseInt(memberId, 10);
        const updatedMembers = members.filter(member => member.user.id !== resetedMemberId);
        
        let firstname = ""; 
        let lastname = "";
        members.forEach(member => {
          if (member.user.id === resetedMemberId) {
            firstname = member.user.firstname;
            lastname = member.user.lastname;
          }
        });
   
        const updateMemberToDisplay = {
            user: {
                id: memberId,
                lastname: lastname,
                firstname: firstname
            },
            teamRoles: addMemberTeamRole,
        };
        
        try {
            if (token) {
                const updatedTeamMemberData = {
                    "teamRoles": addMemberTeamRole
                };
                
                    const updatedTeamMember = await updateTeamMember(teamId, memberId, updatedTeamMemberData, token);
                    console.log("Membre mise à jour avec succès ");
                    setOpen(false);

            setMembers([...updatedMembers, updateMemberToDisplay]);
          
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du membre :", error);
      }
    }

    /**
     * 
     * @param {*} e 
     */
    const handleOpenWidget = (e) => {

        const memberDeleteId = e.currentTarget.getAttribute('data-member-id');
        memberDeleteId && setMemberId(memberDeleteId);

        const memberUpdateId = e.currentTarget.getAttribute('data-member-update-id');
        memberUpdateId && setMemberId(memberUpdateId);  

        const conditionElement = e.currentTarget.className;
        setElement(conditionElement)
        setOpen(true);   
    }


    const handleValidateForm = () => {
        return setOpen((prevstate) => !prevstate);
    }

    const handleCloseWidget = () => {
        return setOpen((prevstate) => !prevstate);
    }

    const handleReturnClick = () => {
        window.history.back();
    };

    const setFormAction = (actionType) => {
        setAction(actionType);
    };
    return (
        <section id='members'>

            <h1>{title}</h1>

            <table>
                <thead>

                    <tr>
                        <th>
                            <h3>{tableTitle}</h3>
                        </th>

                        {(role === "Leader") ? (
                            <th>
                            <button type='click' onClick={handleOpenWidget} className='members'>Ajouter</button>
                        </th>
                        ):('')}
                        
                    </tr>

                </thead>
                <tbody>

                    {(role === "Leader") ? (
                            <tr id="title">
                                <td>Prénom</td>
                                <td>Nom</td>
                                <td>rôle(s)</td>
                                <td className='actions'>Actions</td>
                            </tr>
                    ) : (
                            <tr id="taskerTitle">
                                <td>Prénom</td>
                                <td>Nom</td>
                                <td className='actions'>Actions</td>
                            </tr>
                    )}
                    
                    {members && members.map ((member, key) => (
                        (role === "Leader") ? (
                            <tr key={key} >
                                <span className='link'>
                                    <td className='member'><Link className='link' to={`/equipes/${teamId}/membres/${member.user.id}/`}>{member.user.firstname}</Link></td>
                                    <td className='member'><Link className='link' to={`/equipes/${teamId}/membres/${member.user.id}/`}>{member.user.lastname}</Link></td>
                                    <td className='member memberRolesState'>{
                                        member.teamRoles.length === 1
                                            ? (
                                            <span className='member badge'>{member.teamRoles[0]}</span>
                                            )
                                            : member.teamRoles.length === 2
                                            ? (
                                            <>
                                                <span className='member badge'>{member.teamRoles[0]}</span>
                                                <span className='member badge'>{member.teamRoles[1]}</span>
                                            </>
                                            )
                                            : member.teamRoles.length === 3 
                                            ? (
                                            <>
                                                <span className='member badge'>{member.teamRoles[0]}</span>
                                                <span className='member badge'>{member.teamRoles[1]}</span>
                                                <span className='member badge'>{member.teamRoles[2]}</span>
                                            </>
                                            ) : ""
                                    }</td>
                                </span>
                                <td className='action'>
                                    <button className='updateMember' type='button' data-member-update-id={member.user.id} onClick={handleOpenWidget}><BiSolidPencil color='#495867'/></button>
                                    <button className='deleteMember' type='button' data-member-id={member.user.id} onClick={handleOpenWidget}><TiDeleteOutline color='#FE5F55' /></button>
                                </td>
                            </tr>
                        ) : (
                            member.teamRoles.includes("TASKER") ? (
                            <tr key={key} id={member.user.id}>
                                
                                    <td className='tasker'><Link className='link' to={`/equipes/${teamId}/membres/${member.user.id}/=`}>{member.user.firstname}</Link></td>
                                    <td className='tasker' ><Link className='link' to={`/equipes/${teamId}/membres/${member.user.id}/=`}>{member.user.lastname}</Link></td>
                                
                                <td className='action'>
                                    <button className='assignMember' type='click' onClick={handleOpenWidget}><AiOutlineFileAdd color='#495867' /></button>
                                </td>
                            </tr>
                        ):"")
                    ))}
                    
                </tbody>
            </table>

            <form 
                onSubmit={
                    
                    action === 'searchMember'
                    ? handleSearchMember
                    : action === 'addMember'
                    ? handleAddMemberToTeam
                    : action === 'updateMember'
                    ? handleUpdateTeamMember
                    : action === 'deleteMember'
                    ? handleDeleteMemberFromTeam
                    // : action === 'assignMember'
                    // ? handleAssignMember
                    : null
                }  
                className={`display ${open ? 'open' : ''}`}>
                {(() => {
                    switch (element) {
                    case 'members':
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
                            <h2>Modification des rôles du Membre</h2>
                            <div>
                                <p>Sélectionnez les rôles d&apos;équipe :</p>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="changeMemberTeamRole"
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
                                        name="changeMemberTeamRole"
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
                    );
                    case 'assign':
                    return (
                    <>
                        <h2>Assigner tâche</h2>

                        <section>
                            <div>
                                <div>
                                    <input type='text' placeholder='Titre'/>
                                    <textarea type='text' placeholder='Description'></textarea>
                                </div>
                                <div>
                                    <select>
                                        <option>Catégorie</option>
                                        {categories && categories.map((category, key) => 
                                            <option key={key}>{category.name}</option>
                                        )}
                                    </select>
                                    <select>
                                        <option>Difficulté</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                    <p>Echéance d&apos;acceptation</p>
                                    <input type='date' placeholder="Echéance d'acceptation"/>
                                    <p>Echéance de résalisation</p>
                                    <input type='date' placeholder='Echéance de réalisation'/>
                                </div>
                            </div>
                            
                            <p>{`Assigné à : ${parent.firstname} ${parent.lastname}`}</p>
                        </section>

                        <button type='click' onClick={handleValidateForm}>valider</button>
                    </>
                );
                    
                    default:
                        return null; 
                    }
                })()}
            </form>            

            <div type='click' onClick={handleCloseWidget} className={`curtain ${open ? 'open' : ''}`}></div>

            <section className='actions'>
                <button type='click' onClick={handleReturnClick}>retour</button>
            </section>

        </section>
    )
}

export default TeamMembersList;