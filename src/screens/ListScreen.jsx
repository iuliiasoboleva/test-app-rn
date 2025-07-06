import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, setCurrentItem, setLoading } from '../store/itemsSlice';
import notifee, { AndroidImportance } from '@notifee/react-native';

const GITHUB_USER = 'iuliiasoboleva';

const ListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const loading = useSelector((state) => state.items.loading);

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

  const fetchRepos = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos`);
      const data = await response.json();
      dispatch(setItems(data));
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchRepos();
  }, []);

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
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchRepos} />
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
  text: { fontSize: 16 },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListScreen;
