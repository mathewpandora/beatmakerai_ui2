import React, { createContext, useContext, useState } from 'react';
import { Audio } from 'expo-av';

const AudioPlayerContext = createContext();

export const useAudioPlayer = () => {
    return useContext(AudioPlayerContext);
};

export const AudioPlayerProvider = ({ children }) => {
    const [activeTrack, setActiveTrack] = useState(null); // Состояние для отслеживания активного трека
    const [sounds, setSounds] = useState([]); // Храним все звуки для управления их состоянием
    const loadSound = async (url, onPlaybackStatusUpdate) => {
        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: url },
            { shouldPlay: false },
            onPlaybackStatusUpdate
        );
        setSounds((prevSounds) => [...prevSounds, newSound]); // Добавляем звук в список
        return newSound;
    };

    const stopOtherTracks = (currentSound) => {
        sounds.forEach((sound) => {
            if (sound !== currentSound) {
                sound.stopAsync();
            }
        });
    };

    const contextValue = {
        loadSound,
        activeTrack,
        setActiveTrack,
        stopOtherTracks,
    };

    return (
        <AudioPlayerContext.Provider value={contextValue}>
            {children}
        </AudioPlayerContext.Provider>
    );
};
