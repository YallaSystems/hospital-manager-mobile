import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/AppNavigator';
import { useSignupViewModel } from '../viewmodels/useSignupViewModel';

type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const { t } = useTranslation();
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSignup,
  } = useSignupViewModel(navigation, t);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{t('createAccount')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('firstName') || 'First Name'}
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder={t('lastName') || 'Last Name'}
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder={t('email')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder={t('password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            textContentType="none"
          />
          <TouchableOpacity
            style={styles.showHideButtonInside}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Text style={styles.showHideButtonText}>
              {showPassword ? t('hide') : t('show')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder={t('confirmPassword')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            textContentType="none"
          />
          <TouchableOpacity
            style={styles.showHideButtonInside}
            onPress={() => setShowConfirmPassword((prev) => !prev)}
          >
            <Text style={styles.showHideButtonText}>
              {showConfirmPassword ? t('hide') : t('show')}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>{t('signup')}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f4511e',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  passwordInputContainer: {
    marginBottom: 15,
  },
  passwordInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingRight: 60,
    marginBottom: 0,
    fontSize: 16,
  },
  showHideButtonInside: {
    position: 'absolute',
    right: 15,
    top: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  showHideButtonText: {
    color: '#f4511e',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SignupScreen; 