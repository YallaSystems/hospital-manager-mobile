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
import SignupScreen from '../screens/SignupScreen';
import OtpScreen from '../screens/OtpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import { NavigatorScreenParams } from '@react-navigation/native';

// Placeholder screens if not already implemented
const AppointmentsScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{t('appointments')}</Text>
    </View>
  );
};

/**
 * Defines the parameters for the authentication stack, including routes for Login, Signup, ForgotPassword, and OTP.
 * - Login: The screen for users to enter their credentials.
 * - Signup: The screen for new users to create an account.
 * - ForgotPassword: The screen for users to enter their email to reset password.
 * - Otp: The screen for verifying the user's identity with a one-time password.
 *        It accepts optional email and password parameters to be used in the verification process.
 */
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Otp: { email?: string; password?: string };
};

// RootStackParamList is a TypeScript type that defines the list of all possible routes (screens)
// and their expected parameters for the main stack navigator in this app. It is used by React Navigation
// to provide type safety and autocompletion for navigation actions and route props. Each key is the name
// of a route, and the value is the type of parameters expected by that route (undefined if none).
// The 'Auth' route uses NavigatorScreenParams to nest the AuthStackParamList.
// Usage: Pass RootStackParamList as a generic to createNativeStackNavigator, and use it for typing navigation/route props.
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Home: undefined;
  Appointments: undefined;
  Profile: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
/**
 * A dedicated stack navigator for the authentication flow.
 * This ensures that the authentication screens (Login, Signup, OTP) have their own navigation context,
 * separate from the main application stack.
 */
const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator();

// Header button for Appointments/Profile
const HeaderAuthButton = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  if (isAuthenticated) {
    return <Button title={t('logout')} onPress={() => dispatch(logout())} />;
  } else {
    return <Button title={t('login')} onPress={() => navigation.navigate('Auth', { screen: 'Login' })} />;
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

/**
 * The authentication stack navigator.
 * It groups all authentication-related screens under a single navigator.
 * This component defines the routes for login, signup, forgot password, and OTP verification.
 */
const AuthStack = () => {
  const { t } = useTranslation();
  return (
    <AuthStackNavigator.Navigator
      screenOptions={({navigation})=>({
        headerShown: true,
        headerLeft: () => (
          <Button title={t('back')} onPress={() => navigation.goBack()} />
        ),
      })}
    >
      <AuthStackNavigator.Screen name="Login" component={LoginScreen} options={{ title: t('login') }} />
      <AuthStackNavigator.Screen name="Signup" component={SignupScreen} options={{ title: t('signup') }} />
      <AuthStackNavigator.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: t('forgotPassword') }} />
      <AuthStackNavigator.Screen name="Otp" component={OtpScreen} options={{ title: t('otp') }} />
    </AuthStackNavigator.Navigator>
  );
};

const MainTabs = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator initialRouteName="HomeStackScreen" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeStackScreen" component={HomeStack} options={{ title: t('home') }} />
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
        {/* The Auth stack is nested within the main navigator. */}
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 