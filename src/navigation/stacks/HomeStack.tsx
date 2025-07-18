import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import { useTranslation } from 'react-i18next';
import type { RootStackParamList } from '../AppNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeStack; 