import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './StackNavigator.js'; // Стек для неавторизованных пользователей
import TabNavigator from './TabNavigator.js';

const Stack = createNativeStackNavigator();

const AppStack = ({ isAuthenticated }) => {
    console.log(isAuthenticated)
  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "Bottom" : "Stack"}
      screenOptions={{
        detachPreviousScreen: true, // Очищает экран при переходе
       
      }}
    >
      <Stack.Screen 
        name="Stack" 
        component={AuthStack} 
        options={{ headerShown: false }} // Отключает заголовок
      />
      <Stack.Screen 
        name="Bottom" 
        component={TabNavigator} 
        options={{ headerShown: false }} // Отключает заголовок
      />
    </Stack.Navigator>
  );
};

export default AppStack;
