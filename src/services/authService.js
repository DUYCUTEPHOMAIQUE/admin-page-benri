import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3056/v1/api";

const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER_INFO: "userInfo",
  CLIENT_ID: "clientId",
};

export const setTokensAndUser = (tokens, user, clientId) => {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
  localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
  localStorage.setItem(STORAGE_KEYS.CLIENT_ID, clientId);
};

export const getTokens = () => ({
  accessToken: localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  refreshToken: localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
});

export const getClientId = () => localStorage.getItem(STORAGE_KEYS.CLIENT_ID);

export const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  localStorage.removeItem(STORAGE_KEYS.CLIENT_ID);
};

export const getUserInfo = () => {
  const userInfo = localStorage.getItem(STORAGE_KEYS.USER_INFO);
  return userInfo ? JSON.parse(userInfo) : null;
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    console.log("Login response:", response.data);
    if (response.data.metadata) {
      const { tokens, user } = response.data.metadata;
      setTokensAndUser(tokens, user, user._id);

      return { success: true };
    }
    return { success: false, message: "Invalid response format" };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
};

export const logout = () => {
  clearAuth();
  return true;
};
