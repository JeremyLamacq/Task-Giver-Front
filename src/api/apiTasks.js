const urlApi = "http://jeremylamacq-server.eddi.cloud/api"

const fetchTasks = async (token) => {
    try {
        const response = await fetch(`${urlApi}/api/tasks`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const tasks = await response.json();
            return tasks;
        } else {
            console.error('Échec de la connexion.', await response.json())
        }
        } catch (error) {
            console.error('Erreur :', error)
        }
}

export default fetchTasks;

export const fetchTasksById = async (teamId, token) => {
    try {
        const response = await fetch(`${urlApi}/api/teams/${teamId}/tasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const tasks = await response.json();

            if (tasks) {
            return tasks;
            } else {
                console.error('La réponse ne contient pas de données.', await response.json());
            }

        } else {
            console.error('Échec de la connexion.', await response.json())
        }
        } catch (error) {
            console.error('Erreur :', error)
        }
}

/************search Task by Id ******************/

export const fetchTaskById = async (token, taskId) => {
    try {
        const response = await fetch (`${urlApi}/api/tasks/${taskId}`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const task = await response.json();
            return task;
        } else {
            console.error('Echec de la recherche de tâche', await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/**************create Task ********************/

export const createTask = async (taskData, token, teamId) => {
    try {
        const response = await fetch (`${urlApi}/api/teams/${teamId}/tasks`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(taskData),
        });

        if (response.ok) {
            const newTask = await response.json();
            console.log(newTask);
            return newTask;
        } else {
            console.error('Echec de la création de tâche',await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/************update Task by Id ******************/

export const updateTask = async (taskId, updatedTaskData, teamId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/teams/${teamId}/tasks/${taskId}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedTaskData),
        });

        if (response.ok) {
            const updatedTask = await response.json();
            return updatedTask;
        } else {
            console.error('Echec de la mise à jour de tâche',await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/**************delete Task by Id ********************/

export const deleteTask = async (taskId, teamId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/teams/${teamId}/tasks/${taskId}`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.log('Suppression de tâche ok', await response.json())
            return true;
        } else {
            console.error('Echec de la suppression de tâche', await response.json())
            return false;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return false;
    }
};

/**************Accepte Task by Id ********************/

export const acceptedTask = async (taskId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/tasks/${taskId}/accept`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.log('tâche acceptée', await response.json())
            return true;
        } else {
            console.error('Echec de l\'acceptation de la tâche', await response.json())
            return false;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return false;
    }
};

/**************refuse Task by Id ********************/

export const refusedTask = async (taskId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/tasks/${taskId}/reject`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.log('tâche refusée', await response.json())
            return true;
        } else {
            console.error('Echec du refus de la tâche', await response.json())
            return false;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return false;
    }
};

/**************completed Task by Id ********************/

export const completedTask = async (taskId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/tasks/${taskId}/complete`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.log('completion de tâche ok', await response.json())
            return true;
        } else {
            console.error('Echec de la completion de la tâche', await response.json())
            return false;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return false;
    }
};
