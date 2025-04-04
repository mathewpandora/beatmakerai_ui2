import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../services/apiServices/authApiService';
import NeonPasswordInput from '../components/NeonPasswordInput';
import CustomButton from '../components/CustomButton';
import Logo from '../components/Logo';

const RegisterScreen = ({ route }) => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { email } = route.params;

  const validatePassword = (password) => {
    // Регулярное выражение для валидации пароля (минимум 8 символов, хотя бы одна заглавная буква и одна цифра)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
    setError(null); // Очистим любые предыдущие ошибки

    if (!password) {
      setError('Введите пароль');
      return;
    }

    if (!validatePassword(password)) {
      setError('Пароль должен содержать минимум 8 символов, включать заглавную букву и цифру.');
      return;
    }

    setLoading(true); // Показать индикатор загрузки

    try {
      // Попытка зарегистрировать пользователя
      const response = await registerUser(email, password);
      
      if (response) {
        navigation.navigate('VerifyCode', {email});
      } else {
        setError(response.message); // Если ошибка при регистрации, выводим ее
      }
    } catch (error) {
      setError('Произошла ошибка при регистрации. Попробуйте снова.');
    } finally {
      setLoading(false); // Скрываем индикатор загрузки
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.inputContainer}>
        <NeonPasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder="Придумайте пароль"
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <CustomButton text="Зарегистрироваться" onPress={handleRegister} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    position: 'absolute',
    top: 40,
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterScreen;
