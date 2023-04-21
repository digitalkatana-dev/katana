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
} from '../../../../../redux/slices/accountingSlice';
import dayjs from 'dayjs';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextInput from '../../../../../components/TextInput';
import Alert from '../../../../../components/Alert';
import TouchableOpacity from '../../../../../components/TouchableOpacity';
import './monthTable.scss';

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
		if (entryType === 'Expenses') {
			month.expenses.forEach((item) => {
				row.push({
					_id: item.id,
					date: item.date,
					item: item.item,
					amount: `$${item.amount.toFixed(2)}`,
					notes: item.notes,
				});
			});
		} else if (entryType === 'Revenue') {
			month.revenue.forEach((item) => {
				row.push({
					_id: item.id,
					date: item.date,
					item: item.item,
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
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		backgroundColor: entryType === 'Expenses' ? 'red' : 'green',
	};

	return (
		<TableContainer className='table' component={Paper}>
			<div style={tableTop}>
				<h4 className='txt'>{entryType}</h4>
				<IconButton id='add' onClick={handleAdd}>
					<AddBoxIcon />
				</IconButton>
			</div>
			<Table sx={{ minWidth: 400 }}>
				<TableHead>
					<TableRow>
						<TableCell align='center' className='txt'>
							Date
						</TableCell>
						<TableCell align='center' className='txt'>
							Item
						</TableCell>
						<TableCell align='center' className='txt'>
							Amount
						</TableCell>
						<TableCell align='center' className='txt'>
							Notes
						</TableCell>
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
							<TableCell align='center' className='txt'>
								{row.date}
							</TableCell>
							<TableCell align='center' className='txt'>
								{row.item}
							</TableCell>
							<TableCell align='center' className='txt'>
								{row.amount}
							</TableCell>
							<TableCell align='center' className='txt'>
								<TouchableOpacity onClick={() => handleDialog(row.notes)}>
									<p id='notes'>{row.notes}</p>
								</TouchableOpacity>
							</TableCell>
							<Alert alertType='Notes' />
						</TableRow>
					))}
				</TableBody>
				<TableHead id='footer'>
					<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
						<TableCell>
							<h4 className='txt'>TOTAL {entryType.toUpperCase()}</h4>
						</TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
						<TableCell align='right' className='txt'>
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
