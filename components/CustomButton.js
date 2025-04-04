import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const CustomButton = ({ text, onPress, loading, disabled }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        disabled ? styles.disabledButton : styles.enabledButton,
        loading && styles.loading
      ]} 
      onPress={onPress} 
      disabled={loading || disabled}
    >
      <Text style={styles.buttonText}>{text}</Text>
      {loading && <ActivityIndicator size="small" color="#fff" style={styles.loadingIndicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 'auto', // Автоматическая ширина
    minWidth: 200, // Минимальная ширина для кнопки
  },
  enabledButton: {
    backgroundColor: '#FF0000',
    shadowColor: '#FF0000',
  },
  disabledButton: {
    backgroundColor: '#888888',
    shadowColor: '#888888',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    textAlign: 'center',
    flexShrink: 1, // Это предотвратит перенос текста
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  loading: {
    justifyContent: 'center',
  },
});

export default CustomButton;
