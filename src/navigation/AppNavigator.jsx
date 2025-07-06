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
import { ThemeContext } from '../ThemeContext';
import { setAuth } from '../store/authSlice';

import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = () => (
    <Tab.Navigator>
        <Tab.Screen name="List" component={ListScreen} />
        <Tab.Screen name="Detail" component={DetailScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
);

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
