import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, Text, StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { AppContext } from '../context/appContext';
import CustomButton from '../components/CustomButton';
import Title from "../components/Title";
import SocialLinks from '../components/SocialLinks';
import UserInfoCard from "../components/UserInfoCard";
import {loadUserData, handleLogoutConfirmation, refreshUserData} from "../services/screenService/profileService.js";


const ProfileScreen = ({ navigation }) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const { userData, setUserData, refreshing, setRefreshing } = useContext(AppContext);  // Получаем  и функцию

  //функция для выхода из систесы
  const handleLogout = () => {
    console.log("Только нажали на кнопку - переходим в первую функцию")
    handleLogoutConfirmation(setIsButtonLoading, navigation);  // Вызываем функцию из другого файла
    console.log("")
  };

  // Функция для обновления данных
  const onRefresh = () => {
    refreshUserData(setUserData, setRefreshing);  // Вызов функции для обновления данных
  };

  // Загружаем данные из AsyncStorage при монтировании компонента
  useEffect(() => {
    loadUserData(setUserData);
  }, [userData]);


  return (
      <SafeAreaView style={styles.safeArea}>
        <Title title="Profile" />
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#9Bd35A', '#689F38']} />}
        >



          <View style={styles.block}>
            {userData ? <UserInfoCard userData={userData} /> : <Text style={styles.loadingText}>Загрузка...</Text>}
          </View>
          <View>
            <SocialLinks />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <CustomButton text="Выйти" onPress={handleLogout} loading={isButtonLoading} />
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#333333',
  },
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  block: {
    marginVertical: 0,
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 20, // Добавляем отступ сверху и снизу
  },
});

export default ProfileScreen;
