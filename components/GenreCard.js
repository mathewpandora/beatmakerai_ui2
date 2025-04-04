import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const GenreCard = ({ genreName, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.card, isSelected && styles.selected]}
            onPress={onPress}
        >
            <Text style={styles.genreName}>{genreName}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#444444',
        paddingVertical: 12,
        paddingHorizontal: 24, // Увеличена ширина кнопки
        marginVertical: 8,
        marginHorizontal: 4,
        borderRadius: 20,
        minWidth: 120, // Минимальная ширина для кнопки

        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 5,
        justifyContent: 'center', // Центрирование текста
        alignItems: 'center',
    },
    selected: {
        backgroundColor: '#FF0000',
        shadowColor: '#FF0000', // Красный цвет тени
    },
    genreName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default GenreCard;
