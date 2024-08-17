const urlApi = "http://jeremylamacq-server.eddi.cloud/api"

const fetchTeams = async (token) => {
    try {
        const response = await fetch(`${urlApi}/api/teams`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const teams = await response.json();
            return teams;
        } else {
            console.error('Échec de la connexion.', await response.json())
        }
        } catch (error) {
            console.error('Erreur :', error)
        }
    
}


export default fetchTeams;

/************search Team by Id ******************/

export const fetchTeamById = async (teamId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/teams/${teamId}`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        
        if (response.ok) {
            const team = await response.json();
            if (team.length > 0) {
                const currentTeam = team[0]; 
                // console.log(currentTeam.title);
            // console.log(team);
            return currentTeam;}
        } else {
            console.error('Echec de la recherche d\'équipe', await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/**************create Team ********************/

export const createTeam = async (teamData, token) => {
    try {
        const response = await fetch (`${urlApi}/api/teams`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(teamData),
        });
        
        if (response.ok) {
            const newTeam= await response.json();
            // console.log(newTeam)
            return newTeam;
        } else {
            console.error('Echec de la création d\'équipe', await response.json())
            console.log(token);
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/************update Team by Id ******************/

export const updateTeam = async (teamId, updatedTeamData, token) => {
    try {
        const response = await fetch (`${urlApi}/api/teams/${teamId}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedTeamData),
        });

        if (response.ok) {
            const updatedTeam = await response.json();
            console.log(updatedTeam)
            return updatedTeam;
        } else {
            console.error('Echec de la mise à jour d\'équipe', await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error);
        return null;
    }
};

/**************delete Team by Id ********************/

export const deleteTeam = async (teamId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/teams/${teamId}`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.log('Suppression d\'équipe ok', await response.json())
            return true;
        } else {
            console.error('Echec de la suppression d\'équipe', await response.json())
            // console.log(teamId);
            return false;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return false;
    }
};
