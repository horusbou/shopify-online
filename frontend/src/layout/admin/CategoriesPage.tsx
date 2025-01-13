import React, { useEffect, useState } from "react";
import { getCategories, deleteCategory, updateCategory, addNewCategory } from "../../utils/api"; // Add API for adding/updating categories
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Category } from "../../types";

const CategoriesWrapper = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: hsl(var(--white));
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1.5rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 1rem;
    border-bottom: 1px solid hsl(var(--divider));
    text-align: center;
    font-size: 1.4rem;
  }

  th {
    background-color: hsl(var(--light-grayish-blue));
    color: hsl(var(--very-dark-blue));
  }

  tr:hover {
    background-color: hsl(var(--pale-orange));
  }

  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    border-radius: 0.4rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .view-btn {
    background-color: hsl(var(--orange));
    color: white;
  }

  .edit-btn {
    background-color: green;
    color: white;
  }

  .delete-btn {
    background-color: red;
    color: white;
  }

  .btn:hover {
    opacity: 0.8;
  }
`;

const FormWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;

  input {
    padding: 0.8rem;
    font-size: 1.1rem;
    border: 1px solid hsl(var(--divider));
    border-radius: 4px;
    flex: 1;
  }

  button {
    padding: 0.8rem 1.5rem;
    background-color: hsl(var(--orange));
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background-color: hsl(var(--dark-orange));
  }
`;

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string>(""); // For input field
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null); // Track the category being edited
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddOrUpdateCategory = async () => {
    if (!categoryName.trim()) return;

    if (editCategoryId) {
      await updateCategory(editCategoryId,categoryName)
      setEditCategoryId(null);
    } else {
      await addNewCategory(categoryName)
      
    }

    setCategoryName(""); // Clear input
    fetchCategories(); // Refresh the list
  };

  const handleEdit = (categoryId: string, currentName: string) => {
    setEditCategoryId(categoryId);
    setCategoryName(currentName);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    await deleteCategory(categoryId);
    fetchCategories(); 
  };

  const handleSeeProducts = (categoryId: string) => {
    navigate(`/admin/categories/${categoryId}/products`);
  };

  return (
    <CategoriesWrapper>
      <h2>Categories</h2>
      <FormWrapper>
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button onClick={handleAddOrUpdateCategory}>
          {editCategoryId ? "Update Category" : "Add Category"}
        </button>
      </FormWrapper>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button onClick={() => handleSeeProducts(category.id)}>See Products</button>
                <button onClick={() => handleEdit(category.id, category.name)} style={{ marginLeft: "1rem" }}>
                  Edit
                </button>
                <button onClick={() => handleDeleteCategory(category.id)} style={{ marginLeft: "1rem", color: "red" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </CategoriesWrapper>
  );
};

export default CategoriesPage;
