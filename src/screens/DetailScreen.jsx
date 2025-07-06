import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const DetailScreen = () => {
  const currentItem = useSelector((state) => state.items.currentItem);
  const { colors } = useTheme();
  const { t } = useTranslation();

  if (!currentItem) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.empty, { color: colors.text }]}>
          {t('chooseItem')}
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
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    marginBottom: 10,
  },
  empty: {
    fontSize: 16,
  },
});

export default DetailScreen;
