import React, { useContext } from 'react';
import { View, Text, Button, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useTheme } from '@react-navigation/native';
import { ThemeContext } from '../ThemeContext';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { mode, toggleTheme } = useContext(ThemeContext);
  const darkMode = mode === 'dark';

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isAuthenticated');
    dispatch(logout());
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Настройки</Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>Тёмная тема</Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      <Button title="Выйти" color="red" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
  },
});

export default SettingsScreen;
