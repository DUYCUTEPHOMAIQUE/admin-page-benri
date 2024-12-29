import React, { useEffect, useState } from "react";
import { getRecipes } from "../services/dataService";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getRecipes();
      setRecipes(data);
    };
    fetchRecipes();
  }, []);
  console.log(recipes);
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-xl font-bold mb-2">Recipe List</h3>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} className="border-b py-2">
            {recipe.recipe_name}: {recipe.recipe_desciption}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
