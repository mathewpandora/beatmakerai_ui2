import axios from 'axios';
import {GENRES_API_URL, USER_API_URL} from "../constants/urls.js";


export const getUserInfoAPI = async (token) => {
  try {
    console.log(token);
    const response = await axios.post(
      `${USER_API_URL}/user_info`,
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
    console.error("🔴 Error get user info:", error.response ? error.response.data : error.message);
    return null;
  }
};


export const getUserBeatsAPI = async (token, page = 1, pageSize = 10) => {
  try {
    console.log(token);
    const response = await axios.post(
        `${USER_API_URL}/get_beats?${new URLSearchParams({ page: page, page_size: pageSize }).toString()}`,
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
    console.error("🔴 Error get user beats:", error.response ? error.response.data : error.message);
    return null;
  }
};


export const getUserGengresAPI = async () => {
  try {
  const response = await axios.get(`${GENRES_API_URL}/get_genres`);
  return response.data;
} catch (error) {
    console.error("🔴 Error get user genres:", error.response ? error.response.data : error.message);
    return null;
}}

