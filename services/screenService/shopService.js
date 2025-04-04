import AsyncStorage from "@react-native-async-storage/async-storage";
import {SHOP_DATA, TOKEN_KEY} from "../../constants/storage.js";
import * as SecureStore from 'expo-secure-store';  // Для работы с SecureStore
import {buyAPI} from "../../api/shopAPI.js";

export const loadShopData = async (setShopData) => {
    const shopData = await AsyncStorage.getItem(SHOP_DATA);
    const parsedData = shopData ? JSON.parse(shopData) : null;
    if (parsedData) {
        setShopData(parsedData);
    }
};


export const makePayment = async (amount) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY); // Получи токен текущего пользователя
    const currency = "usd";

    // Умножаем на 100, чтобы перевести цену в центы
    const amountInCents = Math.round(amount * 100);

    console.log(`Converted Amount: ${amountInCents} cents`); // Проверяем, что данные правильные
    const response = await buyAPI(amountInCents, currency, token); // Передаем сумму в центах

    if (response) {
        console.log("✅ Payment Intent Created:", response.client_secret);
        return response;
    } else {
        console.log("❌ Payment Failed");
        return null;
    }
};