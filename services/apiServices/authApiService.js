import * as SecureStore from 'expo-secure-store';
import { loginUserAPI, registerUserAPI, verifyUserAPI, logoutUserAPI, getUserStatusAPI } from '../../api/authAPI.js'; // Импортируем функцию loginUserAPI
import { getUserInfo, getUserGenres } from './userApiService.js';
import {getShopCards} from "./userApiService.js";
import {TOKEN_KEY, EMAIL_KEY, PASSWORD_KEY} from "../../constants/storage.js";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const loginUser = async (email, password) => {
  try {
    const user = { "email": email, "password": password };
    const data = await loginUserAPI(user); // Вызываем API-запрос
    if (!data || !data.access_token) {
      console.error('Login failed: No token received.');
      return null;
    }
    const { access_token } = data;
    await SecureStore.setItemAsync(TOKEN_KEY, access_token);
    console.log('Token saved successfully:', access_token);
    await SecureStore.setItemAsync(EMAIL_KEY, email);
    console.log('Email saved successfully:', email);
    await SecureStore.setItemAsync(PASSWORD_KEY, password);
    console.log('Password saved successfully:', password);
    await getUserInfo(access_token)
    await getUserGenres()
    await getShopCards()
    return access_token;
  } catch (error) {
    console.error('Login failed:', error.message);
    return null;
  }
};


export const registerUser = async (email, password) => {
  try {
    const user = { "email": email, "password": password };
    const data = await registerUserAPI(user); // Вызываем API-запрос
    if (!data) {
      console.error('Registration failed');
      return null;
    }
  await loginUser(email, password)
    return data;
  } catch (error) {
    console.error('Registration failed:', error.message);
    return null;
  }
};


export const logoutUser = async () => {
  try {
    console.log("Зашли в третью функцию")
    const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);

    const data = await logoutUserAPI(accessToken);
    console.log("Отправили на север");
    if (!data) {
      console.error('Logout error');
      return null;
    }
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(EMAIL_KEY); // Очистить email
    await SecureStore.deleteItemAsync(PASSWORD_KEY); // Очистить пароль
    await AsyncStorage.clear();
    return data;
  } catch (error) {
    console.error('Logout failed:', error.message);
    return null;
  }
};


export const verifyUser = async (email, password, code) => {
  try {
    const send_object = {
      "code": {
        "code": code
      },
      "user": {
        "email": email,
        "password": password
      }
    };
    console.log(send_object);
    const data = await verifyUserAPI(send_object); // Вызываем API-запрос
    await loginUser(email, password)
    if (!data) {
      console.error('Verification failed');
      return null;
    }
    return data;
  } catch (error) {
    console.error('Verification failed:', error.message);
    return null;
  }
};


export const getUserStatus = async (email) => {
  try {
    const data = await getUserStatusAPI(email);
    if (!data) {
      console.error('Get user status error');
      return null;
    }
    return data;
  } catch (error) {
    console.error('Get user status failed:', error.message);
    return null;
  }
};
