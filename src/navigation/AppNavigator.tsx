import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { Text, View, Button } from 'react-native';
import { logout } from '../store/slices/authSlice';
import ProfileScreen from '../screens/ProfileScreen';
import { useTranslation } from 'react-i18next';

// Placeholder screens if not already implemented
const SearchScreen = () => {
  const { t } = useTranslation();
  return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{t('search')}</Text>
  </View>
  );
};
const AppointmentsScreen = () => {
  const { t } = useTranslation();
  return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{t('appointments')}</Text>
  </View>
  );
};

// RootStackParamList is a TypeScript type that defines the list of all possible routes (screens)
// and their expected parameters for the main stack navigator in this app. It is used by React Navigation
// to provide type safety and autocompletion for navigation actions and route props. Each key is the name
// of a route, and the value is the type of parameters expected by that route (undefined if none).
// Usage: Pass RootStackParamList as a generic to createNativeStackNavigator, and use it for typing navigation/route props.
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Search: undefined;
  Appointments: undefined;
  Profile: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Header button for Appointments/Profile
const HeaderAuthButton = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  if (isAuthenticated) {
    return <Button title={t('logout')} onPress={() => dispatch(logout())} />;
  } else {
    return <Button title={t('login')} onPress={() => navigation.navigate('Login')} />;
  }
};

const HomeStack = () => {
  const { t } = useTranslation();
  return (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
  );
};
const SearchStack = () => {
  const { t } = useTranslation();
  return (
  <Stack.Navigator>
    <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
  );
};
const AppointmentsStack = () => {
  const { t } = useTranslation();
  return (
  <Stack.Navigator>
    <Stack.Screen
      name="Appointments"
      component={AppointmentsScreen}
      options={({ navigation }) => ({
        headerShown: true,
        title: t('appointments'),
        headerRight: () => <HeaderAuthButton navigation={navigation} />,
      })}
    />
  </Stack.Navigator>
  );
};
const ProfileStack = () => {
  const { t } = useTranslation();
  return (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={({ navigation }) => ({
        headerShown: true,
        title: t('profile'),
        headerRight: () => <HeaderAuthButton navigation={navigation} />,
      })}
    />
  </Stack.Navigator>
  );
};

const MainTabs = () => {
  const { t } = useTranslation();
  return (
  <Tab.Navigator initialRouteName="HomeStackScreen" screenOptions={{ headerShown: false }}>
    <Tab.Screen name="HomeStackScreen" component={HomeStack} options={{ title: t('home') }} />
    <Tab.Screen name="SearchStackScreen" component={SearchStack} options={{ title: t('search') }} />
    <Tab.Screen name="AppointmentsStackScreen" component={AppointmentsStack} options={{ title: t('appointments') }} />
    <Tab.Screen name="ProfileStackScreen" component={ProfileStack} options={{ title: t('profile') }} />
  </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Main'}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <Button title={t('back')} onPress={() => navigation.replace('Main', { screen: 'Home' })} />
            ),
            title: t('login'),
          })}
        />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 