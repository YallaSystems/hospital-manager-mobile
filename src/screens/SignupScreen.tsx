import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/AppNavigator';
import { useSignupViewModel } from '../viewmodels/useSignupViewModel';
import { COLORS } from '../constants/colors';
import SubmitButton from '../components/SubmitButton';
import CustomDropdown from '../components/CustomDropdown';

type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen = React.memo(({ navigation }: SignupScreenProps) => {
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
    sex,
    setSex,
    signupLoading,
    isFormValid,
  } = useSignupViewModel(navigation);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Memoize gender options to prevent recreation on every render
  const genderOptions = useMemo(() => [
    { label: t('male', 'Male'), value: 'male' },
    { label: t('female', 'Female'), value: 'female' },
  ], [t]);

  // Memoize the sex change handler
  const handleSexChange = useCallback((value: string) => {
    setSex(value as 'male' | 'female' | '');
  }, [setSex]);

  // Memoize the password visibility toggles
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <View style={{ flex: 1, position: 'relative', backgroundColor: COLORS.white }}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 30, paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1 }}
        >
          <Text style={styles.title}>{t('createAccount', 'Create Account')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('firstName', 'First Name')}
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder={t('lastName', 'Last Name')}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder={t('email', 'Email')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <CustomDropdown
            value={sex}
            onValueChange={handleSexChange}
            options={genderOptions}
            placeholder={t('selectSex', 'Select Gender')}
          />
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={[styles.input, { paddingRight: 60, marginBottom: 0 }]}
              placeholder={t('password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              textContentType="password"
              autoComplete="password"
            />
            <TouchableOpacity
              style={styles.showHideButtonInside}
              onPress={togglePasswordVisibility}
            >
              <Text style={styles.showHideButtonText}>
                {showPassword ? t('hide') : t('show')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={[styles.input, { paddingRight: 60, marginBottom: 0 }]}
              placeholder={t('confirmPassword')}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              textContentType="newPassword"
              autoComplete="password-new"
            />
            <TouchableOpacity
              style={styles.showHideButtonInside}
              onPress={toggleConfirmPasswordVisibility}
            >
              <Text style={styles.showHideButtonText}>
                {showConfirmPassword ? t('hide') : t('show')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={[
          styles.buttonContainer,
          {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            borderColor: COLORS.border,
            backgroundColor: COLORS.white,
          },
        ]}>
          <SubmitButton
            onPress={handleSignup}
            disabled={!isFormValid}
            loading={signupLoading}
          >
            {t('signup', 'Signup')}
          </SubmitButton>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  passwordInputContainer: {
    marginBottom: 15,
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
  buttonContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
});

export default SignupScreen; 