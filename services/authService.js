import * as SecureStore from 'expo-secure-store'; // Импортируем SecureStore
import {EMAIL_KEY, PASSWORD_KEY} from "../constants/storage.js";

export const checkAuth = async (setIsAuthenticated, setIsLoading) => {
  try {
    // Получаем токен из SecureStore
    const accessToken = await SecureStore.getItemAsync('access_token'); // Используем ключ 'access_token'

    // Проверяем, есть ли токен
    const isAuthenticatedStatus = !!accessToken;
    setIsAuthenticated(isAuthenticatedStatus); // Устанавливаем статус авторизации
  } catch (error) {
    console.error('Ошибка при проверке авторизации:', error);
    setIsAuthenticated(false); // Если ошибка, считаем, что не авторизован
  } finally {
    setIsLoading(false); // Завершаем состояние загрузки
  }
};


// Функция для получения пароля из SecureStore
export const getPasswordFromSecureStore = async () => {
  try {
    const password = await SecureStore.getItemAsync(PASSWORD_KEY);
    if (password) {
      console.log('Пароль получен:', password);
      return password;
    } else {
      console.log('Пароль не найден в SecureStore');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при получении пароля:', error.message);
    return null;
  }
};

// Функция для получения почты из SecureStore
export const getEmailFromSecureStore = async () => {
  try {
    const email = await SecureStore.getItemAsync(EMAIL_KEY); // Используем ключ 'user_email'
    
    if (email) {
      console.log('Почта получена из SecureStore:', email);
      return email;
    } else {
      console.log('Почта не найдена в SecureStore');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при получении почты из SecureStore:', error.message);
    return null;
  }
};



