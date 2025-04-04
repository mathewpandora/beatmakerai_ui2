// components/SocialLinks.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Dimensions } from 'react-native'; // Добавлен импорт Text
import { FontAwesome } from '@expo/vector-icons';

const SocialLinks = () => {
  const links = [
    {
      name: 'VK',
      icon: 'vk',
      url: 'https://vk.com/yourproject',
      color: '#4C75A3',
    },
    {
      name: 'Telegram',
      icon: 'telegram',
      url: 'https://t.me/yourproject',
      color: '#0088cc',
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      url: 'https://instagram.com/yourproject',
      color: '#E4405F',
    },
  ];

  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert(`Не удалось открыть ссылку: ${url}`);
    }
  };

  return (
    <View style={styles.container}>
      {links.map((link) => (
        <TouchableOpacity
          key={link.name}
          style={[styles.linkButton, { backgroundColor: link.color }]}
          onPress={() => openLink(link.url)}
        >
          <FontAwesome name={link.icon} size={28} color="#fff" />
          <View style={styles.textContainer}>
            <Text style={styles.linkText}>{link.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#333',
    flex: 1,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 15,
    marginVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('window').width - 40, // Растягиваем кнопки почти на всю ширину экрана
    alignSelf: 'center', // Центрируем кнопки
  },
  textContainer: {
    flex: 1,
    alignItems: 'center', // Центрируем текст
  },
  linkText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SocialLinks;
