import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfoAPI, getUserBeatsAPI, getUserGengresAPI} from "../../api/userAPI"
import {TOTAL_GENERATIONS, AVAILABLE_GENERATIONS, TOKEN_KEY, GENRES, SHOP_DATA} from "../../constants/storage"
import * as SecureStore from 'expo-secure-store';
import {getShopsCardsAPI} from "../../api/shopAPI.js";



export const getUserInfo = async (token) => {
    try {
        const data = await getUserInfoAPI(token);
        if (!data) {
            return { success: false, error: 'No data received' };
        }
        console.log(data)
        await AsyncStorage.setItem(TOTAL_GENERATIONS, data.total_generation.toString());
        await AsyncStorage.setItem(AVAILABLE_GENERATIONS, data.available_generations.toString());
        return { success: true };
    } catch (error) {
        console.error('Error fetching user info: ', error);
        return { success: false, error: error.message }; // Indicate failure
    }
};


export const getUserBeats = async (page=1) => {
    try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY)
        const data = await getUserBeatsAPI(token, page);
        if (data) {
            return data;
        } else {
            return { success: false, error: 'No data received' };
        }
    } catch (error) {
        console.error('Error fetching user beats: ', error);
        return { success: false, error: error.message };
    }
};


export const getUserGenres = async () => {
    try {
        const data = await getUserGengresAPI();
        console.log(data, "из сервиса");

        if (data) {
            await AsyncStorage.setItem(GENRES, JSON.stringify(data)); // Сохраняем как строку
        } else {
            return { success: false, error: 'No data received' };
        }
    } catch (error) {
        console.error('Error fetching user genres: ', error);
        return { success: false, error: error.message };
    }
};


export const getShopCards = async () => {
    try {
        const data = await getShopsCardsAPI();
        if (data) {
            console.log(data, "данные из getShopsCardsAPI")
            await AsyncStorage.setItem(SHOP_DATA, JSON.stringify(data));
            return data;
        } else {
            return { success: false, error: 'No data received' };
        }
    } catch (error) {
        console.error('Error fetching shop cards: ', error);
        return { success: false, error: error.message };
    }
};

