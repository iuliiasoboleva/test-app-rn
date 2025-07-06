import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Platform,
  PermissionsAndroid,
  useColorScheme,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, setCurrentItem, setLoading } from '../store/itemsSlice';
import notifee, { AndroidImportance } from '@notifee/react-native';

const GITHUB_USER = 'iuliiasoboleva';
const PER_PAGE = 5;

const ListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items || []);
  const loading = useSelector((state) => state.items.loading);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    async function setupNotifications() {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      if (Platform.OS === 'android' && Platform.Version >= 33) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      }
    }

    setupNotifications();
  }, []);

  const fetchRepos = useCallback(async (nextPage = 1, refresh = false) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?page=${nextPage}&per_page=${PER_PAGE}`
      );
      const data = await response.json();

      if (!Array.isArray(data)) {
        console.error('GitHub API error:', data);
        if (refresh) dispatch(setItems([]));
        setHasMore(false);
        return;
      }

      if (refresh || nextPage === 1) {
        dispatch(setItems(data));
      } else {
        const newItems = [...items, ...data];
        dispatch(setItems(newItems));
      }

      setPage(nextPage);
      setHasMore(data.length === PER_PAGE);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      if (refresh) dispatch(setItems([]));
      setHasMore(false);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, items]);

  useEffect(() => {
    fetchRepos(1, true);
  }, []);

  const filteredItems = Array.isArray(items)
    ? items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  const handlePress = async (item) => {
    if (!item) return;

    dispatch(setCurrentItem(item));
    navigation.navigate('Detail');

    await notifee.displayNotification({
      title: 'Вы выбрали элемент',
      body: `ID: ${item.id}, Name: ${item.name}`,
      android: {
        channelId: 'default',
      },
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading && items.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск..."
        placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'}
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id?.toString() || String(Math.random())}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => fetchRepos(1, true)} />
        }
        onEndReached={() => {
          if (!loading && hasMore) {
            fetchRepos(page + 1);
          }
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading && items.length > 0 ? (
            <View style={{ padding: 16 }}>
              <ActivityIndicator size="small" />
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    padding: 16,
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    marginBottom: 12,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    color: '#000',
  },
});

export default ListScreen;
