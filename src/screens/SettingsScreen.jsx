import React, { useContext } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useTheme } from '@react-navigation/native';
import { ThemeContext } from '../ThemeContext';
import { useTranslation } from 'react-i18next';

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
      <Text style={[styles.labelName, { color: colors.text }]}>
        {t('settings.theme')}
      </Text>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>
          {t('settings.darkTheme')}
        </Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      <Text style={[styles.labelName, { color: colors.text }]}>
        {t('settings.language')}
      </Text>

      <View style={styles.langSwitcher}>
        <TouchableOpacity
          style={[
            styles.langOption,
            currentLang === 'ru' && styles.langOptionActive,
          ]}
          onPress={switchToRussian}
        >
          <Text
            style={[
              styles.langOptionText,
              currentLang === 'ru' && styles.langOptionTextActive,
            ]}
          >
            RU
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.langOption,
            currentLang === 'en' && styles.langOptionActive,
          ]}
          onPress={switchToEnglish}
        >
          <Text
            style={[
              styles.langOptionText,
              currentLang === 'en' && styles.langOptionTextActive,
            ]}
          >
            EN
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        title={t('settings.logout')}
        onPress={handleLogout}
      />
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
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  labelName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  langSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  langOption: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#ddd',
  },
  langOptionActive: {
    backgroundColor: '#4CAF50',
  },
  langOptionText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#333',
    fontWeight: '500',
  },
  langOptionTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
