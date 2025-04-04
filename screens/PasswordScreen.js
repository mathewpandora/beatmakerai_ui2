import React, { useState } from 'react';
import Logo from '../components/Logo';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NeonPasswordInput from '../components/NeonPasswordInput';
import CustomButton from '../components/CustomButton';
import { HeaderBackButton } from '@react-navigation/elements';
import { loginUser } from '../services/apiServices/authApiService'; // Импорт функции логина

const PasswordScreen = ({ route }) => {
  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const validatePassword = (password) => {
    // Регулярное выражение: от 8 до 128 символов, минимум 1 заглавная, 1 строчная, 1 цифра, без пробелов.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,128}$/;
    if (!passwordRegex.test(password)) {
      return "Пароль должен содержать 8-128 символов, минимум одну заглавную, одну строчную букву и одну цифру, без пробелов.";
    }
    return "";
  };

  const handleLogin = async () => {
    setError('');
    if (!password) {
      setError('Введите пароль');
      return;
    }

    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const user = await loginUser(email, password);
      if (user) {
        const parentNavigation = navigation.getParent();
        parentNavigation.navigate('Bottom'); // Переход к экрану Bottom в родительской навигации
      } 
    } catch (error) {
      setError('Ошибка сервера. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack()} tintColor="red" />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.inputContainer}>
        <NeonPasswordInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError('');
          }}
          placeholder="Введите пароль"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <CustomButton text="Войти" onPress={handleLogin} loading={loading} />
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
    textAlign: 'center',
  },
});

export default PasswordScreen;
