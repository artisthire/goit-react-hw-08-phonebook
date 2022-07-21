import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
import filterReducer from './filter/filter-reducers';
import userSlice from './user/user-reducers';
import { contactsApi } from 'redux/contacts/contacts-api';
import { rtkContactsApiErrorLogger } from 'services/utils';

const userPersistConfig = {
  key: 'user',
  version: 1,
  storage,
  whitelist: ['token'],
};

const userPersistedReducer = persistReducer(
  userPersistConfig,
  userSlice.reducer
);

const rootReducer = combineReducers({
  [contactsApi.reducerPath]: contactsApi.reducer,
  filter: filterReducer,
  [userSlice.name]: userPersistedReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    contactsApi.middleware,
    rtkContactsApiErrorLogger,
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };
