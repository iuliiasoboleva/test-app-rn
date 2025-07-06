import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import { login } from '../store/authSlice';
import { useTheme } from '@react-navigation/native';

const LoginScreen = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const handleLogin = async () => {
    if (email === 'admin' && password === '1234') {
      await AsyncStorage.setItem('isAuthenticated', 'true');
      dispatch(login());
    } else {
      Alert.alert('Ошибка', 'Неверные данные');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Вход</Text>

      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder={t('login')}
        placeholderTextColor={colors.border}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder={t('password')}
        placeholderTextColor={colors.border}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Войти" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
});

export default LoginScreen;
