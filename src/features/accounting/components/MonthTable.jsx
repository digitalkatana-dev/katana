import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
} from '../../../redux/slices/accountingSlice';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextInput from '../../../components/TextInput';

const MonthTable = () => {
	const { entryType, entryDate, item, amount, notes } = useSelector(
		(state) => state.accounting
	);
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

	return (
		<View>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 400 }}>
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							<TableCell>
								<Text>{entryType}</Text>
							</TableCell>
							<TableCell>
								<IconButton>
									<AddBoxIcon />
								</IconButton>
							</TableCell>
						</TableRow>
					</TableHead>
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
									onChange={(e) => handleChange('date', e.target.value)}
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
						<ScrollView
							bounces={false}
							showsVerticalScrollIndicator={false}
						></ScrollView>
					</TableBody>
					<TableHead>
						<TableRow>
							<TableCell>
								<Text>Total {entryType}</Text>
							</TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell align='right'>$8000</TableCell>
						</TableRow>
					</TableHead>
				</Table>
			</TableContainer>
		</View>
	);
};

export default MonthTable;

const styles = StyleSheet.create({});
