import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from '../store/selectors/userSelectors';
import { loginSuccess } from '../store/slices/authSlice';
import { RootState } from '../store';

const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => selectAccessToken(state));

  useEffect(() => {
    if (token) {
      dispatch(loginSuccess());
    }
  }, [token, dispatch]);

  return <>{children}</>;
};

export default AuthInitializer; 