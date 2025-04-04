import AsyncStorage from '@react-native-async-storage/async-storage';  // Для работы с AsyncStorage
import * as SecureStore from 'expo-secure-store';  // Для работы с SecureStore
import { Alert } from 'react-native';
import { logoutUser } from '../apiServices/authApiService.js';
import { getUserInfo} from "../apiServices/userApiService.js";
import {TOKEN_KEY, AVAILABLE_GENERATIONS, TOTAL_GENERATIONS} from "../../constants/storage.js";
import {getEmailFromSecureStore} from "../authService.js";

export const loadUserData = async (setUserData) => {
    const email = await SecureStore.getItem('user_email');
    const totalGenerations = await AsyncStorage.getItem('total_generations');
    const availableGenerations = await AsyncStorage.getItem('available_generations');

    if (email && totalGenerations && availableGenerations) {
        setUserData({
            email:email,
            total_generations: parseInt(totalGenerations, 10),
            available_generations: parseInt(availableGenerations, 10),
        });
    }
};


export const handleLogoutConfirmation = (setIsButtonLoading, navigation) => {
    console.log("Вызываем алерт во второй функции")
    Alert.alert(
        "Выход",
        "Вы действительно хотите выйти?",
        [
            {
                text: "Отмена",
                style: "cancel",
            },
            {
                text: "Да",
                style: "destructive",
                onPress: async () => {
                    setIsButtonLoading(true);  // Устанавливаем состояние загрузки
                    await logoutUser();  // Логика выхода пользователя
                    setIsButtonLoading(false);  // Завершаем загрузку
                    navigation.replace('Stack');  // Перенаправляем на экран после выхода
                },
            },
        ],
        { cancelable: false }
    );
};


export const refreshUserData = async (setUserData, setRefreshing) => {
    try {
        setRefreshing(true); // Начинаем процесс обновления
        const token = await SecureStore.getItemAsync(TOKEN_KEY)
        const response = await getUserInfo(token);  // Вызываем API для получения данных
        if (response.success) {
            const totalGeneration = await AsyncStorage.getItem(TOTAL_GENERATIONS);
            const availableGenerations = await AsyncStorage.getItem(AVAILABLE_GENERATIONS);
            const password = await getEmailFromSecureStore()
            console.log(totalGeneration, availableGenerations)
            if (totalGeneration && availableGenerations) {

                const parsedData = {
                    email: password,
                    total_generations: parseInt(totalGeneration),
                    available_generations: parseInt(availableGenerations),
                };
                setUserData(parsedData); // Обновляем контекст с новыми данными
            } else {
                console.error('No user data found in AsyncStorage');
            }
        } else {
            // Если произошла ошибка при запросе данных, пытаемся получить их из AsyncStorage
            const totalGeneration = await AsyncStorage.getItem('TOTAL_GENERATIONS');
            const availableGenerations = await AsyncStorage.getItem('AVAILABLE_GENERATIONS');

            if (totalGeneration && availableGenerations) {
                const parsedData = {
                    total_generation: parseInt(totalGeneration),
                    available_generations: parseInt(availableGenerations),
                };
                setUserData(parsedData); // Обновляем контекст с сохраненными данными
            } else {
                console.error('No user data found in AsyncStorage');
            }
        }
    } catch (error) {
        console.error('Ошибка при обновлении данных пользователя:', error);
    } finally {
        setRefreshing(false); // Завершаем процесс обновления
    }
};

export const refreshUserDataAfterGen = async (setUserData) => {
    try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY)
        const response = await getUserInfo(token);  // Вызываем API для получения данных
        if (response.success) {
            const totalGeneration = await AsyncStorage.getItem(TOTAL_GENERATIONS);
            const availableGenerations = await AsyncStorage.getItem(AVAILABLE_GENERATIONS);
            const password = await getEmailFromSecureStore()
            console.log(totalGeneration, availableGenerations)
            if (totalGeneration && availableGenerations) {

                const parsedData = {
                    email: password,
                    total_generations: parseInt(totalGeneration),
                    available_generations: parseInt(availableGenerations),
                };
                setUserData(parsedData); // Обновляем контекст с новыми данными
            } else {
                console.error('No user data found in AsyncStorage');
            }
        } else {
            // Если произошла ошибка при запросе данных, пытаемся получить их из AsyncStorage
            const totalGeneration = await AsyncStorage.getItem('TOTAL_GENERATIONS');
            const availableGenerations = await AsyncStorage.getItem('AVAILABLE_GENERATIONS');

            if (totalGeneration && availableGenerations) {
                const parsedData = {
                    total_generation: parseInt(totalGeneration),
                    available_generations: parseInt(availableGenerations),
                };
                setUserData(parsedData); // Обновляем контекст с сохраненными данными
            } else {
                console.error('No user data found in AsyncStorage');
            }
        }
    } catch (error) {
        console.error('Ошибка при обновлении данных пользователя:', error);
    } finally {
    }
};


