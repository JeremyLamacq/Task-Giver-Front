const urlApi = "https://task-giver.onrender.com"
// const urlApi = "http://jeremylamacq-server.eddi.cloud/api"

const fetchUsers = async (token) => {
    try {
        const response = await fetch(`${urlApi}/api/users`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const users = await response.json();
            return users;
        } else {
            console.error('Échec de la connexion.', await response.json())
        }
        } catch (error) {
            console.error('Erreur :', error)
        }
    
}


export default fetchUsers;

/************User profil JWT ******************/

export const fetchUserProfil = async (token) => {
    try {
        const response = await fetch(`${urlApi}/api/users/profil`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const userProfileData = await response.json();
            return userProfileData;
        } else {
            console.error('Échec de la connexion.', await response.json())
        }
        } catch (error) {
            console.error('Erreur :', error)
        }
    
}

/************Change User profil's firstname and lastname  ******************/

export const updateUserProfil = async (token, updateUser) => {
    try {
        const response = await fetch(`${urlApi}/api/users/profil`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updateUser),
        });

        if (response.ok) {
            const users = await response.json();
            return users;
        } else {
            console.error('Échec de la mise à jour du profil.', await response.json())
        }
        } catch (error) {
            console.error('Erreur :', error)
        }
    
}

/**************** User profil's teams  ******************/

export const fetchTeamsUser = async (userId, token) => {
    try {
        const response = await fetch(`${urlApi}/api/users/${userId}/teams`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const users = await response.json();
            return users;
        } else {
            console.error('Échec de la connexion.', await response.json())
        }
        } catch (error) {
            console.error('Erreur :', error)
        }
}

/************search User by Id ******************/

export const fetchUsersById = async (userId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/users/${userId}`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const user = await response.json();
            return user;
        } else {
            console.error('Echec de la recherche d\'utilisateur', await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/**************create User ********************/

export const createUser = async (userData) => {
    try {
        const response = await fetch (`${urlApi}/api/signup`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const newUser= await response.json();
            return newUser;
        } else {
            console.error('Echec de la création d\'utilisateur', await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/************update User by Id ******************/

export const updateUser = async (userId, updatedUserData, token) => {
    try {
        const response = await fetch (`${urlApi}/api/users/${userId}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUserData),
        });

        if (response.ok) {
            const updatedUser = await response.json();
            return updatedUser;
        } else {
            console.error('Echec de la mise à jour d\'utilisateur', await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/**************delete User by Id ********************/

export const deleteUser = async (userId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/users/${userId}`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.log('Suppression de membre ok', await response.json())
            return true;
        } else {
            console.error('Echec de la suppression d\'utilisateur', await response.json())
            return false;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return false;
    }
};
