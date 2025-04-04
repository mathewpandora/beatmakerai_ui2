import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const Logo = () => {
  const [fontsLoaded] = useFonts({
    logo: require('/Users/matvejtrofimov/Desktop/projects/beatmakerUI2/app/assets/fonts/Call of Ops Duty.otf'), // Путь к вашему шрифту
  });

  if (!fontsLoaded) {
    return <Text>Загрузка шрифта...</Text>; // Покажем текст до загрузки шрифта
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>BEATMAKERAI</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 55,
    fontFamily: 'logo', // Применяем шрифт из assets
    color: '#FF0000',
    shadowColor: '#FF0000',
  },
});

export default Logo;
