import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';

const Title = ({ title }) => {
  const [fontsLoaded] = useFonts({
    logo: require('/Users/matvejtrofimov/Desktop/projects/beatmakerUI2/app/assets/fonts/Call of Ops Duty.otf'),
  });

  if (!fontsLoaded) {
    return <Text>Загрузка шрифта...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 35,
    fontFamily: 'logo',
    color: '#FF0000',
    shadowColor: '#FF0000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    textAlign: 'center', // Обеспечивает центрирование текста
  },
});

export default Title;
