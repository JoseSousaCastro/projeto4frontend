/*Add category - aside button
Edit category - aside dropdown
Delete category - aside dropdown */

import React from "react";
import "./CategoriesAside.css";
import { categoryStore } from "../../stores/CategoryStore";



function CategoriesAside() {
    const { categories, addCategory, editCategory, deleteCategory } = categoryStore();
    const [editCategoryName, setEditCategoryName] = useState(""); // Estado para o novo nome da categoria

    // Função para lidar com a adição de uma nova categoria
    const handleAddCategory = async (event) => {
        event.preventDefault();
        const newCategoryName = event.target.elements["add-category-input"].value;
        // Verifica se já existe uma categoria com o mesmo nome
        if (categories.find(category => category.name === newCategoryName)) {
            console.error("Category with this name already exists");
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/project_backend/rest/users/newCategory/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: userStore((state) => state.token),
                },
                body: JSON.stringify({ name: newCategoryName }),
            });
            if (response.ok) {
                const category = await response.json();
                addCategory(category);
            } else {
                const responseBody = await response.text();
                console.error('Error adding category:', response.statusText, responseBody);
            }
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    // Função para lidar com a edição de uma categoria
    const handleEditCategory = async (event) => {
        event.preventDefault();
        const selectedCategoryName = event.target.value;
        const selectedCategory = categories.find(category => category.name === selectedCategoryName);
        if (!selectedCategory) {
            console.error("Selected category not found");
            return;
        }
        // Verifica se já existe uma categoria com o mesmo nome
        if (categories.find(category => category.name === editCategoryName)) {
            console.error("Category with this name already exists");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/project_backend/rest/users/updateCategory/${selectedCategory.name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: userStore((state) => state.token),
                },
                body: JSON.stringify({ name: editCategoryName }),
            });
            if (response.ok) {
                const updatedCategory = await response.json();
                editCategory(selectedCategory, updatedCategory);
            } else {
                const responseBody = await response.text();
                console.error('Error editing category:', response.statusText, responseBody);
            }
        } catch (error) {
            console.error("Error editing category:", error);
        }
    };

    // Função para lidar com a exclusão de uma categoria
    const handleDeleteCategory = async (event) => {
        const selectedCategoryName = event.target.value;
        const selectedCategory = categories.find(category => category.name === selectedCategoryName);
        if (!selectedCategory) {
            console.error("Selected category not found");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/project_backend/rest/users/deleteCategory/${selectedCategory.name}`, {
                method: 'DELETE',
                headers: {
                    token: userStore((state) => state.token),
                },
            });
            if (response.ok) {
                deleteCategory(selectedCategory);
            } else {
                const responseBody = await response.text();
                console.error('Error deleting category:', response.statusText, responseBody);
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <div>
            <div className="aside">
                <div className="add-category">
                    <label className="add-category-label" htmlFor="add-category-button">Add Category</label>
                    <input className="aside-input" id="add-category-input" type="text" placeholder="New Category" />
                    <button className="aside-button" id="add-category-button" onClick={handleAddCategory}>Add</button>
                </div>
                <div className="dropdown-edit-category">
                    <select className="dropdown-select" id="edit-category-dropdown" onChange={(e) => setEditCategoryName(e.target.value)}>
                        <option value="" disabled selected>Edit Category</option>
                        {/* Mapeando as categorias para criar as opções do dropdown */}
                        {categories.map(category => (
                            <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    <label className="edit-category-label" htmlFor="edit-category-name-input">New Name</label>
                    <input className="aside-input" id="edit-category-name-input" type="text" placeholder="New Name" value={editCategoryName} onChange={(e) => setEditCategoryName(e.target.value)} />
                    <button className="action-button" onClick={handleEditCategory}>Edit</button>
                </div>
                <div className="dropdown-delete-category">
                    <select className="dropdown-select" id="delete-category-dropdown">
                        <option value="" disabled selected>Delete Category</option>
                        {/* Mapeando as categorias para criar as opções do dropdown */}
                        {categories.map(category => (
                            <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    <button className="action-button" onClick={handleDeleteCategory}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default CategoriesAside;
