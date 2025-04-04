import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { loadGenres } from "../services/screenService/generationService.js";
import { GenreCard } from '../components/GenreCard';
import { generateBeat } from "../services/screenService/generationService.js";
import { BeatsContext } from "../context/beatsContext.js";
import { AppContext } from "../context/appContext.js";

const GenerationScreen = () => {
    const {setNewBeat, newBeat} = useContext(BeatsContext);
    const { setUserData } = useContext(AppContext);
    const [loading, _] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        loadGenres(setGenres);
    }, []);

    const handleGenerate = async () => {
        await generateBeat(selectedGenre, setUserData, setNewBeat);
        console.log(newBeat);
        await setNewBeat(prev => !prev);
        console.log(newBeat);
    };

    const handleGenrePress = (genre) => {
        setSelectedGenre(selectedGenre === genre ? null : genre);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Title title="Genres" />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ marginVertical: 5, flexWrap: 'wrap', flexDirection: 'row' }}>
                    {genres.length > 0 ? (
                        genres.map((genre, index) => (
                            <GenreCard
                                key={index}
                                genreName={genre}
                                isSelected={selectedGenre === genre}
                                onPress={() => handleGenrePress(genre)}
                            />
                        ))
                    ) : (
                        <Text style={styles.loadingText}>Нет жанров для отображения</Text>
                    )}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <CustomButton
                    text="Создать"
                    onPress={handleGenerate}
                    loading={loading}
                    disabled={!selectedGenre}
                />
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
    loadingText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginVertical: 10,
    },
    buttonContainer: {
        marginBottom: 20,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
});

export default GenerationScreen;
