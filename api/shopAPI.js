import {SHOP_API_URL} from "../constants/urls.js";
import axios from "axios";

export const getShopsCardsAPI = async () => {
    try {
        const response = await axios.get(`${SHOP_API_URL}/cards`)
        return response.data;
    } catch (error) {
        console.error("🔴 Error get user beats:", error.response ? error.response.data : error.message);
        return null;
    }
};


export const buyAPI = async (amount, currency, token) => {
    try {
        const response = await axios.post(
            `${SHOP_API_URL}/buy`,
            { amount, currency },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Передаем токен авторизации
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data; // { client_secret: "..." }
    } catch (error) {
        console.error("🔴 Error during payment:", error.response ? error.response.data : error.message);
        return null;
    }
};