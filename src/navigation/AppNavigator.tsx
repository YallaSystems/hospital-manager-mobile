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

// Placeholder screens if not already implemented
const SearchScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Search Screen</Text>
  </View>
);
const AppointmentsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Appointments Screen</Text>
  </View>
);
const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);

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
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  if (isAuthenticated) {
    return <Button title="Logout" onPress={() => dispatch(logout())} />;
  } else {
    return <Button title="Login" onPress={() => navigation.navigate('Login')} />;
  }
};

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);
const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);
const AppointmentsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Appointments"
      component={AppointmentsScreen}
      options={({ navigation }) => ({
        headerShown: true,
        headerRight: () => <HeaderAuthButton navigation={navigation} />,
      })}
    />
  </Stack.Navigator>
);
const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={({ navigation }) => ({
        headerShown: true,
        headerRight: () => <HeaderAuthButton navigation={navigation} />,
      })}
    />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator initialRouteName="HomeStackScreen" screenOptions={{ headerShown: false }}>
    <Tab.Screen name="HomeStackScreen" component={HomeStack} options={{ title: 'Home' }} />
    <Tab.Screen name="SearchStackScreen" component={SearchStack} options={{ title: 'Search' }} />
    <Tab.Screen name="AppointmentsStackScreen" component={AppointmentsStack} options={{ title: 'Appointments' }} />
    <Tab.Screen name="ProfileStackScreen" component={ProfileStack} options={{ title: 'Profile' }} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Main'}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <Button title="Back" onPress={() => navigation.replace('Main', { screen: 'Home' })} />
            ),
            title: 'Login',
          })}
        />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 