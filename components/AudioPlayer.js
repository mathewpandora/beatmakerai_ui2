import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useAudioPlayer} from "../context/audioPlayerContext.js";


const AudioPlayer = ({ title, genre, url, img_url, inProgress }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [dragging, setDragging] = useState(false);
    const soundRef = useRef(null);

    const { loadSound, activeTrack, setActiveTrack, stopOtherTracks } = useAudioPlayer();

    useEffect(() => {
        if (!inProgress) {
            const load = async () => {
                soundRef.current = await loadSound(url, onPlaybackStatusUpdate);
            };

            load();

            return () => {
                if (soundRef.current) {
                    soundRef.current.unloadAsync();
                }
            };
        }
    }, [url, inProgress]);

    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded && !dragging) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis);
            setIsPlaying(status.isPlaying);
        }
    };

    const togglePlayPause = async () => {
        if (activeTrack === url) {
            if (isPlaying) {
                await soundRef.current.pauseAsync();
                setIsPlaying(false);
            } else {
                await soundRef.current.playAsync();
                setIsPlaying(true);
            }
        } else {
            stopOtherTracks(soundRef.current);
            setActiveTrack(url);
            await soundRef.current.playAsync();
            setIsPlaying(true);
        }
    };

    const handleSeek = async (value) => {
        setDragging(true);
        await soundRef.current.setPositionAsync(value);
    };

    const handleSliderChange = (value) => setPosition(value);

    const handleSlidingComplete = (value) => {
        setDragging(false);
        handleSeek(value);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    if (inProgress) {
        return (
            <View style={styles.inProgressContainer}>
                <ActivityIndicator size="large" color="#FF0000" />
                <Text style={styles.inProgressText}>Загрузка...</Text>
            </View>
        );
    }

    return (
        <ImageBackground source={{ uri: img_url }} style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.genre}>Жанр: {genre}</Text>
                <View style={styles.controls}>
                    <TouchableOpacity onPress={togglePlayPause}>
                        <Ionicons
                            name={isPlaying ? 'pause-circle' : 'play-circle'}
                            size={50}
                            color="#FF0000"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={duration}
                    value={position}
                    onValueChange={handleSliderChange}
                    onSlidingComplete={handleSlidingComplete}
                    minimumTrackTintColor="#FF0000"
                    maximumTrackTintColor="#fff"
                    thumbTintColor="#FF0000"
                    disabled={activeTrack !== url}
                />
                <Text style={styles.time}>
                    {`${formatTime(position / 1000)} / ${formatTime(duration / 1000)}`}
                </Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
    },
    innerContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    inProgressContainer: {
        backgroundColor: '#555',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        borderRadius: 10,
        marginVertical: 10,
    },
    inProgressText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    genre: {
        fontSize: 14,
        color: '#b3b3b3',
        marginBottom: 15,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: 15,
    },
    icon: {
        shadowColor: '#FF0000',
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    time: {
        fontSize: 12,
        color: '#b3b3b3',
        marginTop: 5,
    },
});

export default AudioPlayer;
