import axios from "axios";
import { getTokens, getClientId } from "./authService";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3056/v1/api";

const getAuthHeaders = () => {
  const { accessToken } = getTokens();
  const clientId = getClientId();
  return {
    "content-type": "application/json",
    authorization: `${accessToken}`,
    "x-client-id": clientId,
  };
};
export const getRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/recipe/all-noshuff`, {
      headers: {
        "content-type": "application/json",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
    });
    return response.data.metadata;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/viewAny?role=admin`, {
      headers: getAuthHeaders(),
    });
    console.log(response.data.metadata);
    return response.data.metadata;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const deleteRecipe = async (recipeId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/recipe/${recipeId}/admin?role=admin`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
};
export const addRecipe = async (recipeData) => {
  console.log("add");
  try {
    const response = await axios.post(`${API_URL}/recipe`, recipeData, {
      headers: getAuthHeaders(),
    });
    console.log(response.status);
    return response.data;
  } catch (error) {
    console.error("Error creating recipe:", error);
  }
};
export const updateRecipe = async (recipeId, recipeData) => {
  console.log("update");

  try {
    const response = await axios.patch(
      `${API_URL}/recipe/${recipeId}`,
      recipeData,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating recipe:", error);
  }
};

//USER

export const addUser = async (userData) => {
  console.log("add");
  console.log(userData);
  try {
    const response = await axios.post(`${API_URL}/user?role=admin`, userData, {
      headers: getAuthHeaders(),
    });
    if (response.data.metadata) {
      return response.data.metadata;
    }
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/user/${userId}?role=admin`,
      {
        headers: getAuthHeaders(),
      }
    );
    if (response.data.metadata) {
      return response.data.metadata;
    }
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
export const updateUser = async (userId, userData) => {
  console.log("update");
  console.log(userData);
  try {
    const response = await axios.patch(
      `${API_URL}/user/updateProfile/${userId}?role=admin`,
      userData,
      {
        headers: getAuthHeaders(),
      }
    );
    if (response.data.metadata) {
      return response.data.metadata;
    }
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
