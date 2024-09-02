const urlApi = "https://task-giver.onrender.com"
// const urlApi = "http://jeremylamacq-server.eddi.cloud/api"

const fetchMembersById = async (teamId, token) => {
    try {
        const response = await fetch(`${urlApi}/api/teams/${teamId}/members`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        
        if (response.ok) {
            const members = await response.json();
            // console.log(members)
            return members;
        } else {
            console.error('Échec de la connexion.', await response.json())
        }
    } catch (error) {
        console.error('Erreur :', error)
    }
}

export default fetchMembersById ;

/************search Member by Id ******************/

export const fetchMemberById = async (teamId, memberId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/teams/${teamId}/members/${memberId}`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const member = await response.json();
            return member;
        } else {
            console.error('Echec de la recherche de membre', await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/************add a Member to team ******************/

export const addMemberToTeam = async (newMember, teamId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/teams/${teamId}/members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newMember),
        });

        if (response.ok) {
            const member = await response.json();
            console.log (member)
            return member;
        } else {
            console.error('Echec ajout de membre', await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/************delete Member from team ******************/

export const deleteMemberFromTeam = async (teamId, memberId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/teams/${teamId}/members/${memberId}`, {
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
            console.error('Echec de la suppression de membre', await response.json())
            return false;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return false;
    }
};

/******************* Update member's teamRole  ************************/

export const updateTeamMember = async (teamId, memberId, updatedMemberData, token) => {
    try {
        const response = await fetch (`${urlApi}/api/teams/${teamId}/members/${memberId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedMemberData),
        });

        if (response.ok) {
            console.log('success')

        } else {
            console.error('Echec de la mise à jour de membre', await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/************search a Member  ******************/

export const searchMember= async (searchMemberData, token) => {
    try {
        const response = await fetch (`${urlApi}/api/users/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(searchMemberData),
        });

        if (response.ok) {
            const member = await response.json();
            return member;
        } else {
            console.error('Echec de la recherche de membre', await response.json())

            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/**************create Member ********************/

export const createMember = async (userData, token) => {
    try {
        const response = await fetch (`${urlApi}/api/members`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const newMember= await response.json();
            return newMember;
        } else {
            console.error('Echec de la création de membre', await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/************update Member by Id ******************/

export const updateMember = async (memberId, updatedMemberData, token) => {
    try {
        const response = await fetch (`${urlApi}/api/members/${memberId}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedMemberData),
        });

        if (response.ok) {
            const updatedMember = await response.json();
            return updatedMember;
        } else {
            console.error('Echec de la mise à jour de membre', await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/**************delete Member by Id ********************/

export const deleteMember = async (memberId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/members/${memberId}`, {

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
            console.error('Echec de la suppression de membre', await response.json())
            return false;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return false;
    }
};
