import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ViewStyle,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/AppNavigator';
import { useSignupViewModel } from '../viewmodels/useSignupViewModel';
import { Picker } from '@react-native-picker/picker';
import { COLORS } from '../constants/colors';
import SubmitButton from '../components/SubmitButton';

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
    sex,
    setSex,
  } = useSignupViewModel(navigation);

  const [sexPickerVisible, setSexPickerVisible] = useState(false);

  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    /^[^\s@+]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    sex &&
    password.length >= 8 &&
    password === confirmPassword;

  const pickerData: Record<'male' | 'female' | '', string> = {
    male: 'male',
    female: 'female',
    '': 'selectSex',
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{t('createAccount')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('firstName')}
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder={t('lastName')}
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
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setSexPickerVisible(true)}
        >
          <Text style={sexPickerText(sex)}>
            {t(pickerData[sex])}
          </Text>
        </TouchableOpacity>
        <Modal
          visible={sexPickerVisible}
          transparent
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setSexPickerVisible(false)} />
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>{t('gender')}</Text>
              <Picker
                style={{ width: '100%' }}
                selectedValue={sex}
                onValueChange={(itemValue) => {
                  setSex(itemValue);
                  setSexPickerVisible(false);
                }}
              >
                <Picker.Item label={t('male')} value="male" />
                <Picker.Item label={t('female')} value="female" />
              </Picker>
            </View>
          </View>
        </Modal>
        <TextInput
          style={styles.input}
          placeholder={t('password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="none"
        />
        <TextInput
          style={styles.input}
          placeholder={t('confirmPassword')}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          textContentType="none"
        />
        {/* Submit Button */}
        <SubmitButton
          onPress={handleSignup}
          disabled={!isFormValid}
        >
          {t('signup')}
        </SubmitButton>
      </View>
    </KeyboardAvoidingView>
  );
};

// Dynamic style for sex picker text
const sexPickerText = (sex: string) => ({
  fontSize: 16,
  color: sex?.length ? COLORS.black : COLORS.gray,
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
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    width: '80%',
    overflow: 'hidden',
  },
  pickerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: -18,
    textAlign: 'center'
  },
});

export default SignupScreen; 