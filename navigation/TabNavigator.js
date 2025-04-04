import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GenerationScreen from '../screens/GenerationScreen';
import BeatsScreen from '../screens/BeatsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShopScreen from '../screens/ShopScreen';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconSource;
          if (route.name === 'Генерация') {
            iconSource = require('/Users/matvejtrofimov/Desktop/projects/beatmakerUI2/app/assets/icons/generation.png');
          } else if (route.name === 'Биты') {
            iconSource = require('/Users/matvejtrofimov/Desktop/projects/beatmakerUI2/app/assets/icons/beats.png');
          } else if (route.name === 'Профиль') {
            iconSource = require('/Users/matvejtrofimov/Desktop/projects/beatmakerUI2/app/assets/icons/profile.png');
          } else if (route.name === 'Магазин') {
            iconSource = require('/Users/matvejtrofimov/Desktop/projects/beatmakerUI2/app/assets/icons/shop.png');
          } 
          
          return (
            <Image
              source={iconSource}
              style={{
                width: size,
                height: size,
                tintColor: color, // Иконки меняются в зависимости от состояния
              }}
            />
          );
        },
        tabBarShowLabel: false, // Скрываем названия вкладок
        headerShown: false, // Убираем заголовок
        tabBarStyle: {
          backgroundColor: '#212121', // Один цвет фона для футера
          height: 90, // Увеличили высоту футера
          paddingBottom: 10, // Дополнительное пространство снизу
          justifyContent: 'center', // Центрирование содержимого
          alignItems: 'center', // Выравнивание по центру
          borderTopWidth: 0, // Убираем верхнюю границу
          borderTopColor: 'transparent', // Делаем цвет границы прозрачным
          shadowColor: '#000', // Черная тень
          shadowOffset: { width: 0, height: -2 }, // Тень сверху
          shadowOpacity: 0.4, // Интенсивность тени
          shadowRadius: 8, // Радиус размытия тени
        },
        tabBarActiveTintColor: '#FF0000', // Активная иконка красная
        tabBarInactiveTintColor: '#D3D3D3', // Неактивная иконка светло-серая
      })}
    >
      <Tab.Screen name="Генерация" component={GenerationScreen} />
      <Tab.Screen name="Биты" component={BeatsScreen} />
      <Tab.Screen name="Магазин" component={ShopScreen} />
      <Tab.Screen name="Профиль" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
