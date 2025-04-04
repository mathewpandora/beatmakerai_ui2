import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Для иконки глаза

const NeonPasswordInput = ({ value, onChangeText, placeholder }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
        secureTextEntry={!isPasswordVisible} // Управляем видимостью пароля
        autoCapitalize="none"
        selectionColor="red" // Устанавливаем красный цвет курсора и выделения
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
        <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative', // Нужно для правильного размещения иконки
  },
  input: {
    height: 40,
    width: '90%',
    paddingHorizontal: 10,
    color: '#fff',
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 0, 0, 0.5)', // Красная линия под полем ввода
    textAlignVertical: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10, // Расположение иконки в правом углу поля ввода
    top: '50%', // Иконка будет по центру по вертикали
    transform: [{ translateY: -12 }], // Чтобы иконка была внутри поля, регулируем отступ
  },
});

export default NeonPasswordInput;
