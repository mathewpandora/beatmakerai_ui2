import React, { useState, useEffect } from 'react';
import { checkAuth } from './services/authService.js'; // Убедитесь, что путь правильный
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './context/appContext';
import LoadingScreen from './screens/LoadingScreen';
import AppStack from './navigation/AppNavigator';
import {AudioPlayerProvider} from "./context/audioPlayerContext.js";
import {BeatsProvider} from "./context/beatsContext.js";
import {StripeProvider} from "@stripe/stripe-react-native";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Для проверки авторизации
  const [isLoading, setIsLoading] = useState(true); // Для отображения состояния загрузки

  useEffect(() => {
    setIsLoading(true);
    checkAuth(setIsAuthenticated, setIsLoading);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
      <StripeProvider publishableKey={"pk_test_51Qqyo5GEVIknUQ2OCxsrJH9oXTT2bjxxr1Eh9EpP4WQpRwPaaSTg2lpefIlErvz4z0ChzT1gSc69kOZqlWi3WvqQ00u4YyBSI6"}>
      <BeatsProvider>
      <AudioPlayerProvider>
    <AppProvider>
      <NavigationContainer>
        <AppStack isAuthenticated={isAuthenticated} />
      </NavigationContainer>
    </AppProvider>
        </AudioPlayerProvider>
      </BeatsProvider>
      </StripeProvider>
  );
};

export default App;
