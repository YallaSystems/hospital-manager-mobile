import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useHomeViewModel } from '../viewmodels/useHomeViewModel';

const HomeScreen = () => {
  // Currently no state, but hook is ready for future logic
  useHomeViewModel();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Hospital Manager</Text>
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