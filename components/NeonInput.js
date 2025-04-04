import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const NeonInput = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
        autoCapitalize="none"
        spellCheck={false}
        selectionColor="red" // Устанавливаем красный цвет курсора и выделения текста
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    color: '#fff',
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 0, 0, 0.5)', // Красная линия под полем ввода
    textAlignVertical: 'center',
  },
});

export default NeonInput;
