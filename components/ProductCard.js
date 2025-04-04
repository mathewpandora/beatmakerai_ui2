import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { makePayment } from "../services/screenService/shopService.js"; // убедись, что makePayment правильный

export const ProductCard = ({ packageName, generationsCount, price, imageUrl }) => {

    const handlePress = async () => {
        try {
            const response = await makePayment(parseFloat(price)); // передаем цену как float
            if (response) {
            } else {
                console.log("Ошибка при оплате");
            }
        } catch (error) {
            console.error("Ошибка при запросе:", error);
        }
    };

    return (
        <View style={styles.cardContainer}>
            <ImageBackground
                source={{ uri: imageUrl }}
                style={styles.imageBackground}
                imageStyle={styles.image}
            >
                <View style={styles.overlay}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.packageName}>{packageName}</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <Text style={styles.text}>Количество генераций: {generationsCount}</Text>
                        <Text style={styles.text}>Цена: {price} $</Text>
                    </View>
                    <TouchableOpacity style={styles.buyButton} onPress={handlePress}>
                        <Text style={styles.buyButtonText}>Купить</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#2C2C2C',
        borderRadius: 10,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    imageBackground: {
        width: '100%',
        height: 250,
        justifyContent: 'flex-end',
    },
    image: {
        borderRadius: 10,
        opacity: 0.7,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    cardHeader: {
        marginBottom: 10,
    },
    packageName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    cardBody: {
        marginBottom: 15,
    },
    text: {
        fontSize: 14,
        color: '#D3D3D3',
    },
    buyButton: {
        shadowColor: '#FF0000',
        backgroundColor: '#FF0000',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buyButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});
