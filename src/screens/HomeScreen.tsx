import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useHomeViewModel } from '../viewmodels/useHomeViewModel';
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
  const { t, i18n } = useTranslation();

  // Currently no state, but hook is ready for future logic
  useHomeViewModel();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('welcome')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 