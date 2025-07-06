import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useTheme } from '@react-navigation/native';
import { ThemeContext } from '../ThemeContext';
import { useTranslation } from 'react-i18next'; // ✅ подключаем хук

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { mode, toggleTheme } = useContext(ThemeContext);
  const darkMode = mode === 'dark';
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0];

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isAuthenticated');
    dispatch(logout());
  };

  const switchToRussian = () => i18n.changeLanguage('ru');
  const switchToEnglish = () => i18n.changeLanguage('en');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t('settings.title')}</Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>{t('settings.darkTheme')}</Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.langButton,
            currentLang === 'ru' && styles.langButtonActive,
          ]}
          onPress={switchToRussian}
        >
          <Text style={[
            styles.langButtonText,
            currentLang === 'ru' && styles.langButtonTextActive,
          ]}>
            {t('settings.ru')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.langButton,
            currentLang === 'en' && styles.langButtonActive,
          ]}
          onPress={switchToEnglish}
        >
          <Text style={[
            styles.langButtonText,
            currentLang === 'en' && styles.langButtonTextActive,
          ]}>
            {t('settings.en')}
          </Text>
        </TouchableOpacity>
      </View>

      <Button title={t('settings.logout')} color="red" onPress={handleLogout} />
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
    gap: 10,
  },
  label: {
    fontSize: 18,
  },
  langButton: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#eee',
  },
  langButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  langButtonText: {
    fontSize: 16,
    color: '#333',
  },
  langButtonTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
