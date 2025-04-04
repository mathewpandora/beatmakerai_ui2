import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { loadBeats } from "../services/screenService/beatsService.js";
import Title from '../components/Title';
import AudioPlayer from '../components/AudioPlayer';
import { BeatsContext } from "../context/beatsContext.js";

const BeatsScreen = () => {
  const {newBeat} = useContext(BeatsContext);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [beats, setBeats] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    console.log('one more render')
    loadBeats(page, setBeats , setHasMore, setLoading);
  }, [page, newBeat]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    setPage(1);
    await loadBeats(page, setBeats, setHasMore, setLoading);
    setIsRefreshing(false);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderItem = ({ item }) => (
      <View style={styles.beatItemContainer}>
        <AudioPlayer
            title={item.title || "Untitled"}
            genre={item.genre}
            url={item.url}
            img_url={item.image_url}
            inProgress={false}
        />
      </View>
  );

  return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.titleWrapper}>
          <Title title="Beats" />
        </View>
        <FlatList
            data={beats}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text style={styles.noBeatsText}>Нет битов для отображения.</Text>}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.0000000001}
            ListFooterComponent={
              loading ? <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} /> : null
            }
        />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#333333',
  },
  beatItemContainer: {
    marginBottom: 15,
  },
  noBeatsText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default BeatsScreen;
