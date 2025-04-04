import axios from 'axios';
import {BEATS_API_URL} from "../constants/urls.js";


export const generateBeatAPI = async (genre, token) => {
    const data = { genre };

    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    try {
        const response = await axios.post(`${BEATS_API_URL}/generate`, data, { headers });
        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(`Error ${error.response.status}:`, error.response.data);

            if (error.response.status === 400 && error.response.data?.detail === "No available generations left for the user.") {
                alert("You have no available generations left.");
            }
        } else {
            console.error("Error:", error.message);
        }
        return null;
    }
};



