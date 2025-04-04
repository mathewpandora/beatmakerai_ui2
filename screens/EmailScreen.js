import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NeonInput from '../components/NeonInput';
import CustomButton from '../components/CustomButton';
import Logo from '../components/Logo';
import { getUserStatus } from '../services/apiServices/authApiService';

const EmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Состояние для индикатора загрузки

  const validateEmail = (email) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleNext = async () => {
    setError(''); // Очищаем предыдущие ошибки
    if (!email) {
      setError('Введите email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Некорректный email');
      return;
    }

    setLoading(true); // Включаем индикатор загрузки перед запросом

    try {
      const user_status = await getUserStatus(email);
      console.log(user_status);

      if (user_status) {
        if (user_status.isVerified) {
          navigation.navigate('Password', { email }); // Если существует и верифицирован
        } else {
          navigation.navigate('VerifyCode', { email }); // Если существует, но не верифицирован
        }
      } else {
        navigation.navigate('Register', { email }); // Если пользователя нет
      }
    } catch (error) {
      console.error('Ошибка получения информации о пользователе:', error);
      setError('Ошибка сети, попробуйте снова'); // Обрабатываем возможную ошибку
    } finally {
      setLoading(false); // Отключаем индикатор загрузки в любом случае
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.inputContainer}>
        <NeonInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError(''); // Очищаем ошибку при изменении текста
          }}
          placeholder="Введите почту"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <CustomButton text="Далее" onPress={handleNext} loading={loading} />
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
    marginTop: 5,
  },
});

export default EmailScreen;
