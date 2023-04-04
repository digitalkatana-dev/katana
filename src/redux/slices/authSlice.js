import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

export const authAdapter = createEntityAdapter();
const initialState = authAdapter.getInitialState({
	loading: false,
	errors: null,
});
