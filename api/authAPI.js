import axios from 'axios';
import {AUTH_API_URL} from "../constants/urls.js";


export const loginUserAPI = async (user) => {
  try {
    const response = await axios.post(
      `${AUTH_API_URL}/login`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("🔴 Error logging in:", error.response ? error.response.data : error.message);
    return null;
  }
};


export const registerUserAPI = async (user) => {
  try {
    const response = await axios.post(
      `${AUTH_API_URL}/register`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("🔴 Error registering user:", error.response ? error.response.data : error.message);
    return null;
  }
};


export const verifyUserAPI = async (send_object) => {
  try {
    const response = await axios.post(
      `${AUTH_API_URL}/verify`,
      send_object,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("🔴 Error verifying user:", error.response ? error.response.data : error.message);
    return null;
  }
};


export const logoutUserAPI = async (token) => {
  try {
    console.log(token)
    const response = await axios.post(
      `${AUTH_API_URL}/logout`,
      {},
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("🔴 Error logging out:", error.response ? error.response.data : error.message);
    return null;
  }
};


export const getUserStatusAPI = async (email) => {
  try {
    const response = await axios.post(
      `${AUTH_API_URL}/check_verify`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("🔴 Error fetching user info:", error.response ? error.response.data : error.message);
    return null;
  }
};