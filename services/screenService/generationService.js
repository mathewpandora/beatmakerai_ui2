import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { GENRES, TOKEN_KEY } from '../../constants/storage.js';
import { WS_API_URL } from '../../constants/urls.js';
import { generateBeatAPI } from '../../api/beatsAPI.js';
import { refreshUserDataAfterGen } from './profileService.js';

// Функция загрузки токена
const getToken = async () => {
    const token = await SecureStore.getItem(TOKEN_KEY);
    if (!token) {
        console.warn("Authorization token is missing");
    }
    return token;
};

// Функция отображения алерта после успешного создания бита
const showBeatSuccessAlert = (setNewBeat) => {
    Alert.alert(
        "Kudos!",
        "Awesome! Your beat has been successfully added!",
        [
            {
                text: "OK",
                onPress: () => setNewBeat(prev => !prev),
            }
        ],
        { cancelable: false }
    );
};

// Функция загрузки жанров
export const loadGenres = async (setGenres) => {
    try {
        const storedGenres = await AsyncStorage.getItem(GENRES);
        console.log(storedGenres, "полученные жанры (сырой вид)");

        const genres = storedGenres ? JSON.parse(storedGenres) : [];
        console.log(genres, "полученные жанры (распаршенные)");

        setGenres(genres);
    } catch (err) {
        console.error("Ошибка при загрузке жанров", err);
    }
};

// Функция генерации бита
export const generateBeat = async (genre, setUserData, setNewBeat) => {
    try {
        const token = await getToken();
        if (!token) return;

        const response = await generateBeatAPI(genre, token);

        if (response?.message === "Beat has started generation") {
            generateBeatWebSocket(setUserData, setNewBeat).catch(console.error);
            return null;
        }

        if (response?.message === "Existing beat found.") {
            showBeatSuccessAlert(setNewBeat);
            return null;
        }
    } catch (error) {
        console.error("Error in generateBeat:", error.message);
    }
};

// Функция обработки WebSocket
export const generateBeatWebSocket = async (setUserData, setNewBeat) => {
    try {
        const token = await getToken();
        if (!token) return null;

        const ws = new WebSocket(`${WS_API_URL}/generate-beat?token=${encodeURIComponent(token)}`);

        ws.onopen = () => console.log("✅ WebSocket connection established");

        ws.onmessage = (event) => {
            console.log("🎵 Message received:", event.data);
            refreshUserDataAfterGen(setUserData);
            showBeatSuccessAlert(setNewBeat);
        };

        ws.onerror = (error) => console.error("❌ WebSocket error:", error);

        ws.onclose = (event) => console.log("🔌 WebSocket closed:", event);

        return ws;
    } catch (error) {
        console.error("❌ Error in generateBeatWebSocket:", error);
        return null;
    }
};
