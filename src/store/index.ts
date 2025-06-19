/**
 * Redux Store Configuration
 * 
 * This file sets up the Redux store with the following features:
 * - Redux Toolkit for simplified Redux setup
 * - Redux Persist for state persistence
 * - Redux Saga for side effects
 * - Redux Logger for development debugging
 */

import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import authReducer from './slices/authSlice';
import {rootSaga} from './sagas/rootSaga';

/**
 * Root Reducer
 * Combines all feature reducers into a single reducer
 * Currently includes:
 * - auth: Authentication state management
 */
const rootReducer = combineReducers({
  auth: authReducer,
});

/**
 * Redux Persist Configuration
 * - key: The key used to store the persisted state in AsyncStorage
 * - storage: The storage engine (AsyncStorage for React Native)
 * - whitelist: Array of reducer names to persist
 *   Currently only persisting auth state
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // only auth will be persisted
};

// Create a persisted reducer that will save state to AsyncStorage
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Initialize Redux Saga middleware
const sagaMiddleware = createSagaMiddleware();

/**
 * Redux Logger Configuration
 * - collapsed: Collapse log groups by default
 * - timestamp: Add timestamps to logs
 * - colors: Use colors in console output
 */
const logger = createLogger({
  collapsed: true,
});

/**
 * Redux Store Configuration
 * - reducer: The root reducer with persistence
 * - middleware: Custom middleware configuration
 *   - serializableCheck: Configure serializable state check
 *   - Added sagaMiddleware for handling side effects
 *   - Added logger for development debugging
 * 
 * getDefaultMiddleware:
 * - Returns an array of default middleware that Redux Toolkit includes
 * - Default middleware includes:
 *   - redux-thunk: For handling async actions
 *   - serializableCheck: Ensures state is serializable
 *   - immutableCheck: Ensures state updates are immutable
 *   - actionCreatorCheck: Validates action creators
 * - Can be configured by passing options:
 *   - serializableCheck: Configure serializable state validation
 *   - immutableCheck: Configure immutable state validation
 *   - thunk: Configure thunk middleware
 * - Additional middleware can be added using .concat()
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignoredActions is used to prevent redux-persist actions from triggering unwanted warnings or errors in middleware like redux-logger or serializableCheck
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(sagaMiddleware, logger),
});

// persistor is used by Redux Persist to control and manage the persistence layer. It is passed to the PersistGate component in the app's entry point to delay rendering of the app UI until the persisted state has been retrieved and rehydrated into the Redux store.
export const persistor = persistStore(store);

// Run the root saga
sagaMiddleware.run(rootSaga);

/**
 * TypeScript Types
 * - RootState: Type for the entire Redux state
 * - AppDispatch: Type for the dispatch function
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 