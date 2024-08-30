const urlApi = "http://127.0.0.1:8080"
// const urlApi = "http://jeremylamacq-server.eddi.cloud/api"

// const fetchCategories = async (token) => {
//     try {
//         const response = await fetch(`${urlApi}/api/categories`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//         });

//         if (response.ok) {
//             const categories = await response.json();
//             return categories;
//         } else {
//             console.error('Échec de la connexion.')
//         }
//         } catch (error) {
//             console.error('Erreur :', error)
//         }
    
// }

// export default fetchCategories;

/************search Categories by Id ******************/

export const fetchCategoryById = async (teamId, categoryId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/teams/${teamId}/categories/${categoryId}`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const category = await response.json();
            // console.log(category)
            return category;
        } else {
            console.error('Echec de la recherche de catégorie', await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/************search Categories by teamId ******************/

const fetchCategoriesByTeamId = async (teamId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/teams/${teamId}/categories`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const category = await response.json();
            return category;
        } else {
            console.error('Echec de la recherche de catégorie', await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

export default fetchCategoriesByTeamId;

/**************create Category ********************/

export const createCategory = async (categoryData, token, teamId) => {
    try {
        const response = await fetch (`${urlApi}/api/teams/${teamId}/categories`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(categoryData),
        });

        if (response.ok) {
            const newCategory= await response.json();
            return newCategory;
        } else {
            console.error('Echec de la création de catégorie', await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/************update Category by Id ******************/

export const updateCategory = async (teamId, categoryId, updatedCategoryData, token) => {
    try {
        const response = await fetch (`${urlApi}/api/teams/${teamId}/categories/${categoryId}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedCategoryData),
        });

        if (response.ok) {
            const updatedCategory = await response.json();
            return updatedCategory;
        } else {
  
            console.error('Echec de la mise à jour de catégorie', await response.json())
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return null;
    }
};

/**************delete Category by Id ********************/

export const deleteCategory = async (teamId, categoryId, token) => {
    try {
        const response = await fetch (`${urlApi}/api/teams/${teamId}/categories/${categoryId}`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.log('Suppression de catégorie ok', await response.json())
            return true;
        } else {
            console.error('Echec de la suppression de catégorie 1', await response.json())
            return false;
        }
    } catch (error) {
        console.error('Erreur :', error)
        return false;
    }
};
