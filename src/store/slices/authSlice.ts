/**
 * Authentication Slice
 * 
 * This slice manages the authentication state of the application.
 * It handles:
 * - User authentication status
 * - User information
 * - Loading states
 * - Error states
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

/**
 * Authentication State Interface
 * @property isAuthenticated - Whether the user is currently authenticated
 * @property user - User information including email and token
 * @property loading - Whether an authentication request is in progress
 * @property error - Any error message from the last authentication attempt
 */
interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    token: string | null;
  } | null;
  loading: boolean;
  error: string | null;
}

/**
 * Initial state for the authentication slice
 */
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

/**
 * Authentication Slice
 * 
 * Actions:
 * - loginRequest: Initiates the login process
 * - loginSuccess: Handles successful login
 * - loginFailure: Handles failed login attempts
 * - logout: Handles user logout
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Initiates the login process
     * @param state - Current state
     * @param action - Payload containing email and password
     */
    loginRequest: (state, action: PayloadAction<{email: string; password: string}>) => {
      state.loading = true;
      state.error = null;
    },
    /**
     * Handles successful login
     * @param state - Current state
     * @param action - Payload containing user email and token
     */
    loginSuccess: (state, action: PayloadAction<{email: string; token: string}>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    /**
     * Handles failed login attempts
     * @param state - Current state
     * @param action - Payload containing error message
     */
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    /**
     * Handles user logout
     * @param state - Current state
     */
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const {loginRequest, loginSuccess, loginFailure, logout} = authSlice.actions;
export default authSlice.reducer; 