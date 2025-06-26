import React from 'react';
import { Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { useTranslation } from 'react-i18next';

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

export default HeaderAuthButton; 