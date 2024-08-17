/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import "./TaskDetail.scss";
import { completedTask, deleteTask, fetchTaskById, updateTask } from "../../api/apiTasks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const TaskDetail = ({ token, categories, members, teamId, teamRoles }) => {

  /***************************   TaskId recovery *****************************/
  
    const taskGlobal = useParams();
    const taskId = taskGlobal.id;
    const role = teamRoles;
   
    const [taskDetail, setTaskDetail] = useState([]);
    const [open, setOpen] = useState(false);
    const [element, setElement] = useState("");
    
    const [creatorFirstname, setCreatorFirstname] = useState();
    const [creatorLastname, setCreatorLastname] = useState();
    const [assignateFirstname, setAssignateFirstname] = useState();
    const [assignateLastname, setAssignateLastname] = useState();
    
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [difficulty, setDifficulty] = useState();
    const [accepTime, setAcceptTime] = useState();
    const [limiteTime, setLimiteTime] = useState();
    const [assignate, setAssignate] = useState();
    
  useEffect(() => {
  
      const fetchTaskData = async () => {
          if (token) {
              const fetchedTask = await fetchTaskById(token, taskId);
              setTaskDetail(fetchedTask);
            }
          };
          fetchTaskData();
  }, [token, taskId]);

  /**
   * 
   * @param {*} e 
   * @returns 
   */
  const handleOpenWidget = (e) => {
    setElement(e.currentTarget.className);

    return setOpen((prevstate) => !prevstate);
  };

  /**
   * 
   * @param {*} e 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setCreatorFirstname(await taskDetail[0].createdBy.firstname);
    setCreatorLastname(await taskDetail[0].createdBy.lastname);

    setAssignateFirstname(await taskDetail[0].assignedTo.firstname);
    setAssignateLastname(await taskDetail[0].assignedTo.lastname);

    try {
      if (token) {
        const updatedTaskData = {
            title: title,
            category: parseInt(category),
            description: description,
            difficulty: parseInt(difficulty),
            acceptDeadline: accepTime,
            completionDeadline: limiteTime,
            assignedTo: parseInt(assignate)
        };
        const updatedTask = await updateTask(taskId, updatedTaskData, teamId, token);
        console.log("Tâche modifiée avec succès :", title);
        setTitle('');
        setDescription('');
        setCategory('');
        setDifficulty('');
        setAcceptTime('');
        setLimiteTime('');
        setAssignate('');        
        setOpen(false);
        setTaskDetail([...taskDetail, updatedTaskData]);
        window.location.reload();
      }
    } catch (error) {
      console.error("Erreur lors de la modification de la tâche :", error);
    }
  };

  /**
   * 
   * @param {*} e 
   */
  const handleDelete = (e) => {   
    e.preventDefault();

    deleteTask(taskId, teamId, token)
        .then((success) => {
            const message = success
                ? 'Tâche supprimée avec succès'
                : 'Échec de la suppression de la tâche';
            console.log(message);
            setOpen(false);
            window.history.back();
        })
        .catch((error) => {
            console.error('Erreur lors de la suppression de la tâche', error);
        });
  }

    const handleCompleted = (e) => {
      e.preventDefault();
      completedTask(taskId, token)
      .then((success) => {
        const message = success
            ? 'Tâche complétée avec succès'
            : 'Échec de la completion de la tâche zut';
        console.log(message);
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
            console.error('Erreur lors de la complétion de la tâche', error);
        });
    } 

  // const handleUpdateForm = () => {
  //   return setOpen((prevstate) => !prevstate);
  // };

  const handleValidateForm = () => {
    return setOpen((prevstate) => !prevstate);
  };

  const handleCloseWidget = () => {
    return setOpen((prevstate) => !prevstate);
  };


  const handleReturnClick = () => {
    window.history.back();
  };

  return (
    <>
      {taskDetail && taskDetail.map((task, index) => (
        <section key={index} id="task">
          <h1 id={task.id}>Tâche</h1>

          <section className="read">
            <div>
              <p>{task.title}</p>
              <p className="description">{task.description}</p>
            </div>
            <div>
              <p>
                Catégorie :{" "}
                {task.category ? task.category.name : "aucune pour l'instant"}
              </p>
              <p>Difficulté : {task.difficulty}</p>
              <div>
                <div>
                  <p className="title">Echéance d&apos;acceptation</p>
                  <p>{(task.acceptDeadline) ? new Date(task.acceptDeadline).toLocaleDateString("fr") : "Aucune échéance"}</p>               
                </div>
                <div>
                  <p className="title">Echéance de réalisation</p>
                  <p>{(task.completionDeadline) ? new Date(task.completionDeadline).toLocaleDateString("fr") : "Aucune échéance"}</p>       
                </div>
                <div>
                  <p className="title">Date de réalisation</p>
                  <p>{(task.datetimeCompleted) ? new Date(task.datetimeCompleted).toLocaleDateString("fr") : "Non réalisée"}</p>                             
                </div>
              </div>
              <p>
                {task.status === 0
                  ? "Non assigné"
                  : task.status === 1
                  ? "Assigné"
                  : task.status === 2
                  ? "En cours"
                  : task.status === 3
                  ? "Réalisé"
                  : "Refusé"}
              </p>
            </div>
          </section>

          <section className="assignment">
            <p>Créé par : {creatorFirstname} {creatorLastname}</p>
            <p>assignée à :{assignateFirstname} {assignateLastname}</p>  
          </section>  

          <form
            onSubmit={element === "assign" && role.includes("GIVER") 
              ? handleSubmit : element === "delete" && role.includes("GIVER") 
              ? handleDelete : element === "complete" && role.includes("TASKER") 
              && !role.includes("GIVER") ? handleCompleted : ""}
              className={`display ${open ? "open" : ""}`}
          >
            {element === "assign" && role.includes("GIVER") && (
              <>
                <h2>Modifier tâche</h2>

                <section>
                  {taskDetail && taskDetail.map((task, index) => (
                    <div key={index}>
                      <div>
                        <input
                            type="text"
                            name="text"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={task.title}
                        />
                        <textarea
                            type="text"
                            name="text"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={task.description}
                        ></textarea>
                      </div>
                      <div>
                        <select onChange={(e) => setCategory(e.target.value)}>
                            <option>Catégorie</option>
                            {categories && categories.map((category, key) => 
                                <option key={key} value={category.id}>{category.name}</option>
                            )}
                        </select>
                        <select onChange={(e) => setDifficulty(e.target.value)}>
                            <option>Difficulté : {task.difficulty}</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        <p>Echéance d&apos;acceptation</p>
                        <input
                            type="date"
                            name="date"
                            onChange={(e) => setAcceptTime(e.target.value)}
                        />
                        <p>Echéance de résalisation</p>
                        <input
                            type="date"
                            name="date"
                            onChange={(e) => setLimiteTime(e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </section>


                <select onChange={(e) => {setAssignate(e.target.value)}}>
                    <option>Réassigner à</option>
                    {members && members.map((member, key) => (member.teamRoles.includes("TASKER") ? (
                        <option key={key} value={member.user.id}> {member.user.lastname} {member.user.firstname}</option>
                    ):""))}
                </select>

                <button type="submit">valider</button>
              </>
            )}
            {element === "delete" && role.includes("GIVER") && (
                <>
                    <h2>Supprimer tâche</h2>
                    <p>Êtes-vous sur de vouloir supprimer cette tâche déffinitivement ?</p>
                    <button
                        className="assign"
                        type="click"
                        onClick={handleValidateForm}
                    >
                        Valider
                    </button>
                </>
            )}
            {element === "complete" && role.includes("TASKER") && (
              <>
                <h2>Compléter tâche</h2>

                <p>Êtes-vous sur d&apos;avoir fini cette tâche ?</p>

                <button type="click" onClick={handleValidateForm}>
                    valider
                </button>
              </>
            )}
          </form>

          <div
            type="click"
            onClick={handleCloseWidget}
            className={`curtain ${open ? "open" : ""}`}
          ></div>

          <section className="actions">
            {role.includes("GIVER") ? (
                <>
                    <button
                        className="assign"
                        type="click"
                        onClick={handleOpenWidget}
                    >
                        Modifier
                    </button>
                    <button
                        className="delete"
                        type="click"
                        onClick={handleOpenWidget}
                    >
                        Supprimer
                    </button>
                </>
            ) : (
              ""
            )}
            {role.includes("TASKER") ? (
              <button
                className="complete"
                type="click"
                onClick={handleOpenWidget}
              >
                Valider
              </button>
            ) : (
              ""
            )}

            <button type="click" onClick={handleReturnClick}>
              retour
            </button>
          </section>
        </section>
      ))}
    </>
  );
};

export default TaskDetail;
