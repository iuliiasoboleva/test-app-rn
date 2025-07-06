import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';

const DetailScreen = () => {
  const currentItem = useSelector((state) => state.items.currentItem);
  const { colors } = useTheme();

  if (!currentItem) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.empty, { color: colors.text }]}>
          Выберите элемент из списка
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {currentItem.name}
      </Text>
      <Text style={{ color: colors.text }}>ID: {currentItem.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  empty: {
    fontSize: 16,
  },
});

export default DetailScreen;
