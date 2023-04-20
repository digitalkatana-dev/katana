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
import authReducer from './slices/authSlice';
import accountingReducer from './slices/accountingSlice';
import navReducer from './slices/navSlice';

const authPersistConfig = {
	key: 'auth',
	storage,
	whitelist: ['user'],
};

const accountingPersistConfig = {
	key: 'accounting',
	storage,
	whitelist: ['selectedYear', 'year', 'month'],
};

export const store = configureStore({
	reducer: {
		auth: persistReducer(authPersistConfig, authReducer),
		accounting: persistReducer(accountingPersistConfig, accountingReducer),
		nav: navReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
