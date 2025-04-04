// components/UserInfoCard.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserInfoCard = ({ userData }) => {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoText}>Email: {userData.email}</Text>
      <Text style={styles.infoText}>Общее количество генераций: {userData.total_generations}</Text>
      <Text style={styles.infoText}>Доступные генерации: {userData.available_generations}</Text>
    
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: '#444444',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
  },
  processingText: {
    color: 'green',
    fontSize: 18,
  },
  notProcessingText: {
    color: 'red',
    fontSize: 18,
  },

});

export default UserInfoCard;
