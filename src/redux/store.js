import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducers from './contactSlice';
import filterReducers from './filterSlice';

const persistedContactsReducer = persistReducer(
  {
    key: 'saved-contacts',
    storage,
    whitelist: ['items'],
  },
  contactsReducers
);

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filters: filterReducers,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
