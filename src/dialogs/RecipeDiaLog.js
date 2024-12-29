import React, { useState, useEffect } from "react";

const RecipeDialog = ({ isOpen, onClose, recipe, onSubmit, mode }) => {
  const [formData, setFormData] = useState({
    recipe_name: "",
    recipe_desciption: "",
    recipe_ingredients: [],
    recipe_cook_time: "",
    recipe_youtube_url: "",
    recipe_category: "",
    recipe_image: "",
    is_published: true,
    is_draft: false,
    recipe_rating: 0,
  });

  useEffect(() => {
    if (recipe && mode === "edit") {
      setFormData(recipe);
    }
  }, [recipe, mode]);

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      recipe_ingredients: [
        ...formData.recipe_ingredients,
        { name: "", measure: "", quantity: "", unit: "" },
      ],
    });
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = formData.recipe_ingredients.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, recipe_ingredients: newIngredients });
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.recipe_ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFormData({ ...formData, recipe_ingredients: newIngredients });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">
          {mode === "add" ? "Add New Recipe" : "Edit Recipe"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
        >
          {/* Basic Info Section */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Recipe Name
                </label>
                <input
                  type="text"
                  value={formData.recipe_name}
                  onChange={(e) =>
                    setFormData({ ...formData, recipe_name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.recipe_category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      recipe_category: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={formData.recipe_desciption}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    recipe_desciption: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                rows="4"
              />
            </div>
          </div>

          {/* Media Section */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold">Media</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.recipe_image}
                  onChange={(e) =>
                    setFormData({ ...formData, recipe_image: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  YouTube URL
                </label>
                <input
                  type="url"
                  value={formData.recipe_youtube_url}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      recipe_youtube_url: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Ingredients</h3>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Ingredient
              </button>
            </div>
            {formData.recipe_ingredients.map((ingredient, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 items-center">
                <input
                  placeholder="Name"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  className="p-2 border rounded"
                />
                <input
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                  className="p-2 border rounded"
                />
                <input
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) =>
                    handleIngredientChange(index, "unit", e.target.value)
                  }
                  className="p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Cooking Time (minutes)
                </label>
                <input
                  type="number"
                  value={formData.recipe_cook_time}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      recipe_cook_time: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.recipe_rating}
                  onChange={(e) =>
                    setFormData({ ...formData, recipe_rating: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>

          {/* Publishing Options */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold">Publishing Options</h3>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) =>
                    setFormData({ ...formData, is_published: e.target.checked })
                  }
                  className="mr-2"
                />
                Published
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_draft}
                  onChange={(e) =>
                    setFormData({ ...formData, is_draft: e.target.checked })
                  }
                  className="mr-2"
                />
                Draft
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {mode === "add" ? "Add Recipe" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeDialog;
