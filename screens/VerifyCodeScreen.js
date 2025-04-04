import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Keyboard, 
  InputAccessoryView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { verifyUser } from '../services/apiServices/authApiService';
import { getPasswordFromSecureStore } from '../services/authService.js';
import Logo from '../components/Logo'; // Импортируем компонент Logo

const VerifyCodeScreen = ({ route }) => {
  const navigation = useNavigation();

  const [code, setCode] = useState(['', '', '', '', '', '']); // Массив для хранения значений 6 цифр
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { email } = route.params;
  // Создаем массив рефов для управления фокусом на полях
  const inputRefs = useRef([]);
  const accessoryViewID = "hideAccessory"; // ID для InputAccessoryView

  // Функция для обработки изменения кода в ячейке
  const handleChange = (value, index) => {
    // Если введено не число, игнорируем
    if (/[^0-9]/.test(value)) return;

    // Обновляем массив кода
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Автоматический переход на следующее поле, если не последняя ячейка
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Функция для отправки кода на сервер
  const handleVerify = async () => {
    setError(null); // Очистка ошибок

    // Проверяем, что все ячейки заполнены
    if (code.some(c => c === '')) {
      setError('Пожалуйста, введите все цифры');
      return;
    }

    // Собираем полный код
    const fullCode = code.join('');
    setLoading(true);
    console.log("Отправка кода:", fullCode)

    try {
      const password = await getPasswordFromSecureStore()
      const verify = await verifyUser(email, password, fullCode)
      if (verify) {
        const parentNavigation = navigation.getParent();
        parentNavigation.navigate('Bottom');
      }
    } catch (err) {
      setError('Произошла ошибка при отправке кода. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Логотип в верхней части экрана */}
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.inputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              value={digit}
              onChangeText={(value) => handleChange(value, index)}
              maxLength={1}
              keyboardType="numeric"
              style={styles.input}
              autoFocus={index === 0}
              returnKeyType={index === 5 ? 'done' : 'next'}
              inputAccessoryViewID={accessoryViewID} // Привязываем ID аксессуару
              ref={(ref) => (inputRefs.current[index] = ref)}
              selectionColor="red"  // Задаем красный цвет курсора и выделения
            />
          ))}
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </TouchableWithoutFeedback>

      <CustomButton text="Подтвердить" onPress={handleVerify} loading={loading} />

      {/* Пустой InputAccessoryView для скрытия стандартного окна */}
      <InputAccessoryView nativeID={accessoryViewID}>
        <></>
      </InputAccessoryView>
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
    top: 40, // Расположить логотип в верхней части экрана
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 50,
    backgroundColor: '#444444',
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default VerifyCodeScreen;
