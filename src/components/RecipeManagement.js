import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRecipes,
  deleteRecipe,
  addRecipe,
  updateRecipe,
} from "../services/dataService";
import RecipeDialog from "../dialogs/RecipeDiaLog";

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [dialogMode, setDialogMode] = useState("add");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const data = await getRecipes();
      setRecipes(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch recipes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleAddNew = () => {
    setDialogMode("add");
    setSelectedRecipe(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (recipe) => {
    setDialogMode("edit");
    setSelectedRecipe(recipe);
    setIsDialogOpen(true);
  };
  const handleSubmit = async (formData) => {
    try {
      if (dialogMode === "add") {
        await addRecipe(formData);
      } else {
        await updateRecipe(selectedRecipe._id, formData);
      }
      setIsDialogOpen(false);
      await fetchRecipes();
    } catch (err) {
      setError(
        dialogMode === "add"
          ? "Failed to add recipe"
          : "Failed to update recipe"
      );
      console.error(err);
    }
  };

  const handleDelete = async (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(recipeId);
        await fetchRecipes();
      } catch (err) {
        setError("Failed to delete recipe");
        console.error(err);
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-600 p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold">Recipe Management</h1>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recipes List</h2>
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add New Recipe
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cook Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recipes.map((recipe) => (
                    <tr key={recipe._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {recipe.recipe_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {recipe.recipe_category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {recipe.recipe_cook_time} mins
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(recipe)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(recipe._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <RecipeDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        recipe={selectedRecipe}
        onSubmit={handleSubmit}
        mode={dialogMode}
      />
    </div>
  );
};

export default RecipeManagement;
