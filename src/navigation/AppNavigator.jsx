import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import { ThemeContext } from '../ThemeContext';
import { setAuth } from '../store/authSlice';

import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = () => {
    const { t } = useTranslation();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 10,
                },
            }}
        >
            <Tab.Screen
                name="List"
                component={ListScreen}
                options={{
                    title: t('list'),
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="list-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Detail"
                component={DetailScreen}
                options={{
                    title: t('detail'),
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="document-text-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: t('setting'),
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="settings-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const checkAuth = async () => {
            const storedAuth = await AsyncStorage.getItem('isAuthenticated');
            dispatch(setAuth(storedAuth === 'true'));
            setLoading(false);
        };
        checkAuth();
    }, [dispatch]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <Stack.Screen name="Main" component={Tabs} />
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
