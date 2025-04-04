import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

// Ключи для сохранения в AsyncStorage
const TOTAL_GENERATIONS = 'total_generations';
const AVAILABLE_GENERATIONS = 'available_generations';
const EMAIL_KEY = 'user_email';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Состояние для данных пользователя
  const [userData, setUserData] = useState({
    email: "error",
    total_generations: 0,
    available_generations: 0,
  });
  const [refreshing, setRefreshing] = useState(false);  // Состояние для отслеживания процесса обновления


  // Загружаем данные из SecureStore и AsyncStorage при монтировании компонента
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Получаем email из SecureStore
        const email = await SecureStore.getItemAsync(EMAIL_KEY);
        console.log(email)
        // Получаем данные из AsyncStorage
        const totalGenerations = await AsyncStorage.getItem(TOTAL_GENERATIONS);
        const availableGenerations = await AsyncStorage.getItem(AVAILABLE_GENERATIONS);
        console.log(totalGenerations)
        console.log(availableGenerations)
        // Устанавливаем данные в состояние
        setUserData({
          email:email,
          total_generations: totalGenerations ? parseInt(totalGenerations) : 0,
          available_generations: availableGenerations ? parseInt(availableGenerations) : 0,
        });
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);

  return (
    <AppContext.Provider value={{ userData, setUserData, refreshing, setRefreshing }}>
      {children}
    </AppContext.Provider>
  );
};
