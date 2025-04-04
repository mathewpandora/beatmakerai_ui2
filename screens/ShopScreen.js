import React, { useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Title from '../components/Title';
import {loadShopData} from "../services/screenService/shopService.js";
import {ProductCard} from "../components/ProductCard.js";
const ShopScreen = () => {
  const [shopData, setShopData] = useState();

  useEffect(() => {
    loadShopData(setShopData);
  }, []);


  return (
    <SafeAreaView style={styles.safeArea}>
      <Title title={"shop"} />
      <ScrollView
        contentContainerStyle={styles.container}>
        <View style={styles.block}>
          {shopData && shopData.length > 0 ? (
              shopData.map((packageItem) => (
                  <ProductCard
                      key={packageItem.id}
                      packageName={packageItem.name}
                      generationsCount={packageItem.generations_count}
                      price={packageItem.price}
                      imageUrl={packageItem.image_url}/>
              ))
          ) : (
              <Text style={styles.loadingText}>Загружаем пакеты...</Text>
          )}
        </View>
      </ScrollView>
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
  loadingText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  block: {
    marginVertical: 10,
  },
});

export default ShopScreen;
