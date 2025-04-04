import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmailScreen from '../screens/EmailScreen';
import PasswordScreen from '../screens/PasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import { HeaderBackButton } from '@react-navigation/elements';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerStyle: { backgroundColor: '#333333' },
        headerTitle: '', // Убираем название экрана
        headerShadowVisible: false, // Убираем разделительную линию
        headerTintColor: 'red', // Устанавливаем глобально красный цвет для кнопок в заголовке
        headerLeft: route.name === 'Email'
          ? null
          : () => (
              <HeaderBackButton
                onPress={() => navigation.goBack()}
                labelVisible={false}
                tintColor="red" // Устанавливаем красный цвет для кнопки назад
              />
            ),
      })}
    >
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
