import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import notifee from '@notifee/react-native';
import { Provider } from 'react-redux';
import { ThemeProvider } from './src/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/store';
import './src/i18n';

const App = () => {
  useEffect(() => {
    async function requestPermission() {
      if (Platform.OS === 'android') {
        const settings = await notifee.requestPermission();
        console.log('Permission settings:', settings);

        // Создание канала уведомлений (нужно только 1 раз)
        await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });
      }
    }

    requestPermission();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
