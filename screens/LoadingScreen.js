import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>beatmakerAI</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Темный фон
  },
  text: {
    color: '#E23A3A',
    fontSize: 32,
    fontFamily: 'Roboto', // Или любой другой шрифт, если хотите
    fontWeight: '600',
  },
});

export default LoadingScreen;
