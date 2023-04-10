import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import dayjs from 'dayjs';
import katanaApi from '../../api/katanaApi';

export const getYear = createAsyncThunk(
	'accounting/get_year',
	async (search, { rejectWithValue }) => {
		try {
			const res = await katanaApi.get(
				search ? `/years/?year=${search}` : '/years'
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const updateYear = createAsyncThunk(
	'accounting/update_year',
	async (data, { rejectWithValue }) => {
		const { year, month, ...others } = data;
		try {
			const res = await katanaApi.put(`/years/${year}/month/${month}`, others);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const accountingAdapter = createEntityAdapter();
const initialState = accountingAdapter.getInitialState({
	loading: false,
	selectedYear: new Date().getFullYear().toString(),
	year: null,
	month: null,
	startBal: 0,
	entryType: '',
	entryDate: dayjs(new Date()).format('M/D/YYYY'),
	item: '',
	amount: 0,
	notes: '',
	revenue: null,
	expenses: null,
	totalRev: 0,
	totalExp: 0,
	hidden: true,
	visible: false,
	show: false,
	open: false,
	dialogTxt: '',
	errors: null,
});

export const accountingSlice = createSlice({
	name: 'accounting',
	initialState,
	reducers: {
		setSelectedYear: (state, action) => {
			if (action.payload === '') {
				state.selectedYear = initialState.selectedYear;
				state.year = null;
				state.totalExp = 0;
				state.totalRev = 0;
			} else {
				state.selectedYear = action.payload;
			}
		},
		setMonth: (state, action) => {
			state.month = action.payload;
		},
		setStartBal: (state, action) => {
			state.startBal = action.payload;
		},
		setEntryType: (state, action) => {
			state.entryType = action.payload;
		},
		setEntryDate: (state, action) => {
			state.entryDate = action.payload;
		},
		setItem: (state, action) => {
			state.item = action.payload;
		},
		setAmount: (state, action) => {
			state.amount = action.payload;
		},
		setNotes: (state, action) => {
			state.notes = action.payload;
		},
		setTotalRev: (state, action) => {
			state.totalRev = action.payload;
		},
		setTotalExp: (state, action) => {
			state.totalExp = action.payload;
		},
		setHidden: (state, action) => {
			state.hidden = action.payload;
		},
		setVisible: (state, action) => {
			state.visible = action.payload;
		},
		setShow: (state, action) => {
			state.show = action.payload;
		},
		setOpen: (state) => {
			state.open = !state.open;
		},
		setDialogTxt: (state, action) => {
			state.dialogTxt = action.payload;
		},
		clearForm: (state) => {
			state.entryDate = '';
			state.item = '';
			state.amount = '';
			state.notes = '';
		},
		resetAccountingSlice: (state) => {
			state.loading = false;
			state.selectedYear = '';
			state.year = null;
			state.month = null;
			state.startBal = 0;
			state.entryType = '';
			state.entryDate = '';
			state.item = '';
			state.amount = 0;
			state.notes = '';
			state.revenue = null;
			state.expenses = null;
			state.totalRev = 0;
			state.totalExp = 0;
			state.hidden = true;
			state.visible = false;
			state.show = false;
			state.open = false;
			state.dialogTxt = '';
			state.errors = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getYear.pending, (state) => {
				state.loading = true;
				state.errors = {};
			})
			.addCase(getYear.fulfilled, (state, action) => {
				state.loading = false;
				state.year = action.payload;
			})
			.addCase(getYear.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(updateYear.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(updateYear.fulfilled, (state, action) => {
				state.loading = false;
				state.year = action.payload.updatedYear;
				state.month = action.payload.updatedMonth;
				state.errors = null;
			})
			.addCase(updateYear.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(resetAccountingSlice, (state) => {
				accountingAdapter.removeAll(state);
			})
			.addCase(PURGE, (state) => {
				accountingAdapter.removeAll(state);
				state.loading = false;
				state.selectedYear = '';
				state.year = null;
				state.month = null;
				state.startBal = 0;
				state.entryType = '';
				state.entryDate = '';
				state.item = '';
				state.amount = 0;
				state.notes = '';
				state.revenue = null;
				state.expenses = null;
				state.totalRev = 0;
				state.totalExp = 0;
				state.hidden = true;
				state.visible = false;
				state.show = false;
				state.open = false;
				state.dialogTxt = '';
				state.errors = null;
			});
	},
});

export const {
	setSelectedYear,
	setMonth,
	setStartBal,
	setEntryType,
	setEntryDate,
	setItem,
	setAmount,
	setNotes,
	setTotalRev,
	setTotalExp,
	setHidden,
	setVisible,
	setShow,
	setOpen,
	setDialogTxt,
	clearForm,
	resetAccountingSlice,
} = accountingSlice.actions;

export default accountingSlice.reducer;
