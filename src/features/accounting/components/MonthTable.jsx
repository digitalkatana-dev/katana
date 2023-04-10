import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	setEntryDate,
	setItem,
	setAmount,
	setNotes,
	setOpen,
	setDialogTxt,
	updateYear,
	clearForm,
} from '../../../redux/slices/accountingSlice';
import dayjs from 'dayjs';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextInput from '../../../components/TextInput';
import Alert from '../../../components/Alert';

const MonthTable = () => {
	const {
		entryType,
		entryDate,
		year,
		month,
		item,
		amount,
		notes,
		totalExp,
		totalRev,
	} = useSelector((state) => state.accounting);
	const dispatch = useDispatch();

	const handleChange = (input, value) => {
		switch (input) {
			case 'date':
				dispatch(setEntryDate(value));
				break;

			case 'item':
				dispatch(setItem(value));
				break;

			case 'amount':
				dispatch(setAmount(value));
				break;

			case 'notes':
				dispatch(setNotes(value));
				break;

			default:
				break;
		}
	};

	const handleAdd = () => {
		let data = {
			yearId: year._id,
			year: year.year,
			monthId: month._id,
			month: month.name,
		};

		switch (entryType) {
			case 'Expenses':
				data.expense = {
					id: `e-${Math.random().toString(16).substring(2, 8)}`,
					date: entryDate,
					item,
					amount,
					notes,
				};
				dispatch(updateYear(data));
				break;

			case 'Revenue':
				data.revenue = {
					id: `r-${Math.random().toString(16).substring(2, 8)}`,
					date: entryDate,
					item,
					amount,
					notes,
				};
				dispatch(updateYear(data));
				break;

			default:
				break;
		}

		dispatch(clearForm());
	};

	const handleDialog = (data) => {
		dispatch(setDialogTxt(data));
		dispatch(setOpen());
	};

	const tabelData = () => {
		let row = [];
		const items = (data) => (
			<Text ellipsizeMode='tail' numberOfLines={1} style={styles.items}>
				{data.item}
			</Text>
		);
		if (entryType === 'Expenses') {
			month.expenses.forEach((item) => {
				row.push({
					_id: item.id,
					date: item.date,
					item: items(item),
					amount: `$${item.amount.toFixed(2)}`,
					notes: item.notes,
				});
			});
		} else if (entryType === 'Revenue') {
			month.revenue.forEach((item) => {
				row.push({
					_id: item.id,
					date: item.date,
					item: items(item),
					amount: `$${item.amount.toFixed(2)}`,
					notes: item.notes,
				});
			});
		}
		const sorted = row.sort((a, b) => {
			return new Date(a.date) - new Date(b.date);
		});
		return sorted;
	};

	const tableTop = {
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		backgroundColor: entryType === 'Expenses' ? 'red' : 'green',
	};

	return (
		<TableContainer component={Paper}>
			<View style={tableTop}>
				<Text>{entryType}</Text>
				<IconButton style={styles.add} onClick={handleAdd}>
					<AddBoxIcon />
				</IconButton>
			</View>
			<Table sx={{ minWidth: 400 }}>
				<TableHead>
					<TableRow>
						<TableCell align='center'>Date</TableCell>
						<TableCell align='center'>Item</TableCell>
						<TableCell align='center'>Amount</TableCell>
						<TableCell align='center'>Notes</TableCell>
					</TableRow>
				</TableHead>
				<TableHead>
					<TableRow>
						<TableCell>
							<TextInput
								size='small'
								margin='dense'
								type='date'
								onChange={(e) =>
									handleChange('date', dayjs(e.target.value).format('M/D/YYYY'))
								}
							/>
						</TableCell>
						<TableCell>
							<TextInput
								label='Item'
								size='small'
								margin='dense'
								value={item}
								onChange={(e) => handleChange('item', e.target.value)}
							></TextInput>
						</TableCell>
						<TableCell>
							<TextInput
								label='Amount'
								size='small'
								margin='dense'
								value={amount}
								onChange={(e) => handleChange('amount', e.target.value)}
							></TextInput>
						</TableCell>
						<TableCell>
							<TextInput
								label='Notes'
								size='small'
								margin='dense'
								value={notes}
								onChange={(e) => handleChange('nates', e.target.value)}
							></TextInput>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tabelData().map((row) => (
						<TableRow key={row._id}>
							<TableCell align='center'>{row.date}</TableCell>
							<TableCell align='center'>{row.item}</TableCell>
							<TableCell align='center'>{row.amount}</TableCell>
							<TableCell align='center'>
								<TouchableOpacity onPress={() => handleDialog(row.notes)}>
									<p style={styles.notes}>{row.notes}</p>
								</TouchableOpacity>
							</TableCell>
							<Alert />
						</TableRow>
					))}
				</TableBody>
				<TableHead style={styles.footer}>
					<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
						<TableCell>
							<Text>TOTAL {entryType.toUpperCase()}</Text>
						</TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
						<TableCell align='right'>
							$
							{entryType === 'Expenses'
								? totalExp
								: entryType === 'Revenue'
								? totalRev
								: null}
						</TableCell>
					</TableRow>
				</TableHead>
			</Table>
		</TableContainer>
	);
};

export default MonthTable;

const styles = StyleSheet.create({
	tableTop: {
		height: 60,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: 'green',
		position: 'relative',
	},
	add: {
		position: 'absolute',
		right: 20,
		top: 9,
		color: 'whitesmoke',
	},
	notes: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		maxWidth: '222px',
	},
	footer: {
		backgroundColor: 'dodgerblue',
	},
});
