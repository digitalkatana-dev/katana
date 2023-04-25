import {
	// createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
// import katanaApi from '../../api/katanaApi';

export const contactAdapter = createEntityAdapter();
const initialState = contactAdapter.getInitialState({
	loading: false,
	email: '',
	message: '',
	success: null,
	errors: null,
});

export const contactSlice = createSlice({
	name: 'contact',
	initialState,
	reducers: {
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setMessage: (state, action) => {
			state.message = action.payload;
		},
	},
});

export const { setEmail, setMessage } = contactSlice.actions;

export default contactSlice.reducer;
