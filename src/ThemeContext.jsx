import React, { createContext, useEffect, useState } from 'react';
import { lightTheme, darkTheme } from './theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    AsyncStorage.getItem('theme').then((value) => {
      if (value === 'dark') setMode('dark');
    });
  }, []);

  const toggleTheme = async () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    await AsyncStorage.setItem('theme', newMode);
  };

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
