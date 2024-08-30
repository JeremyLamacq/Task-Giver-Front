/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createCategory, updateCategory, deleteCategory, fetchCategoryById } from "../../api/apiCategories";
import { useState, useEffect } from "react";
import "./Categories.scss";

import { BiSolidPencil } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";

  const Categories = ({ categories, setCategories, token, teamId }) => {

  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [element, setElement] = useState('');  
  const [action, setAction] = useState('create');
  const [categoryIdToUpdate, setCategoryIdToUpdate] = useState('');
  const [categoryNameToUpdate, setCategoryNameToUpdate] = useState("");

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
        console.log("Équipe créée avec succès :", categoryName, teamId);
        setCategoryName("");
        setOpen(false);
        setCategories([...categories, newCategoryData]);
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'équipe :", error);
    }
  };

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

  const handleDeleteCategory = (event) => {
    const categoryId = categoryIdToUpdate;
    
    event.preventDefault();
    deleteCategory(teamId, categoryId, token)
      .then((success) => {
        const message = success
            ? 'Catégorie supprimée avec succès'
            : 'Échec de la suppression de la catégorie';
        handleCloseWidget();

        const updatedCategories = categories.filter((category) => category.id != categoryId);
        setCategories(updatedCategories) 
        console.log(message);
      })
      .catch((error) => {
          console.error('Erreur lors de la suppression de la catégorie', error);
      });
  }

  const handleEditCategory = async (categoryId) => {
 
    try {
      const currentCategory = await fetchCategoryById(teamId, categoryId, token);
      console.log(currentCategory.name)
      if (currentCategory) {      
        setCategoryNameToUpdate(currentCategory.name);
        setCategoryIdToUpdate(categoryId);
        setElement('update');
        setOpen(true);
      } else {
        console.error('Aucune donnée de catégorie trouvée.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données de la catégorie :', error);
    }
  };

  const handleOpenWidget = async (categoryId, actionType) => {
    setCategoryIdToUpdate(categoryId);
    setElement(actionType); 
    setOpen(true);
  };

  const handleCloseWidget = () => {
    return setOpen((prevstate) => !prevstate);
  };

  const handleReturnClick = () => {
    window.history.back();
  };

  const setFormAction = (actionType) => {
    setAction(actionType);
  };


  return (
    <section id="categories">
      <h1>Catégories</h1>

      <table>
        <thead>
          <tr>
            <th>
              <h3>Catégories</h3>
            </th>

            <th>
              <button

                type="click"
                onClick={() => handleOpenWidget("","create")}
                className="categories"
              >
                Ajouter
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr id="title">
            <td className="category headTabColor">Nom</td>
            <td className="action headTabColor">Actions</td>
          </tr>

          {categories.map((category, key) => (
            <tr key={key}>
              <td className="category">{category.name}</td>
              <td className="action">
                <button
                  className="update"
                  type="button"
                  onClick={() => handleEditCategory(category.id)}
                >
                  <BiSolidPencil color="#495867" />
                </button>
                <button
                  data-category-id={category.id}
                  className="delete"
                  type="button"
                  onClick={() => handleOpenWidget(category.id, "delete")}
                >
                  <TiDeleteOutline color="#FE5F55" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form
        onSubmit={
          action === 'delete'
           ? handleDeleteCategory
           : action === 'create'
           ? handleSubmitCategory
           : action === 'update'
           ? handleUpdateCategory
           : null
        }
        className={`display ${open ? "open" : ""}`}
      >
        {element === "create" && (
          <>
            <h2>Ajouter une catégorie</h2>
            <input
              type="text"
              name="categories"
              value={categoryName}
              placeholder="nom de la catégorie"
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button onClick={() => setFormAction('create')}>Valider</button>
          </>
        )}

        {element === "update" && (
          <>
            <h2>Mise à jour de la catégorie</h2>
            <input
              type="text"
              name="update"
              placeholder="nouveau nom de catégorie"
              value={categoryNameToUpdate}
                                
              onChange={(e) =>
              setCategoryNameToUpdate(e.target.value)
              }
            />
            <button onClick={() => setFormAction('update')}>Valider</button>
          </>
        )}

        {element === "delete" && (
          <>
            <h2>Suppression</h2>
            <p>Cette action effectuera une suppression définitive</p>
            <button onClick={() => setFormAction('delete')}>
              Valider
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
        <button type="click" onClick={handleReturnClick}>
          retour
        </button>
      </section>
    </section>
  );
};

export default Categories;
