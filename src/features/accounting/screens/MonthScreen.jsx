import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Card, CardContent, IconButton } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEntryType } from '../../../redux/slices/accountingSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MonthTable from '../components/MonthTable';
import TextInput from '../../../components/TextInput';

const MonthScreen = () => {
	const {
		loading,
		selectedYear,
		month,
		show,
		startBal,
		hidden,
		// entryType,
		totalExp,
		totalRev,
	} = useSelector((state) => state.accounting);
	const dispatch = useDispatch();
	// const start = parseFloat(month.startBal);
	// const pro = parseFloat(profit(totalRev, totalExp));
	// const endBal = start + pro;
	const balInput = useRef(null);
	const entryType = 'Expenses';

	const handleChange = (input, value) => {
		switch (input) {
			case 'entryType':
				dispatch(setEntryType(value));
				break;

			default:
				break;
		}
	};

	return (
		<View style={styles.canvas}>
			<Text>{month.name + ' ' + selectedYear}</Text>
			<Card style={styles.card}>
				<CardContent style={styles.container}>
					<View style={styles.row}>
						<View style={styles.starting}>
							<Text>Starting Bal: </Text>
							{month.startBal === 0 && !show ? (
								<TouchableOpacity>
									<Text>Set Starting Bal</Text>
								</TouchableOpacity>
							) : show ? (
								<TextInput ref={balInput} margin='dense' value={startBal} />
							) : month.startBal !== 0 ? (
								<TouchableOpacity>
									<Text>$</Text>
								</TouchableOpacity>
							) : null}
							{!hidden && (
								<IconButton>
									<AddCircleOutlineIcon />
								</IconButton>
							)}
						</View>
						<Text>Expenses:</Text>
					</View>
					<View style={styles.row}>
						<Text>Revenue:</Text>
					</View>
					<View style={styles.row}>
						<Text>Ending Bal:</Text>
						<Text>Profit:</Text>
					</View>
				</CardContent>
			</Card>
			<select onChange={(e) => handleChange('entryType', e.target.value)}>
				<option value=''>Choose...</option>
				<option value='Expenses'>Expenses</option>
				<option value='Revenue'>Revenue</option>
			</select>
			<ScrollView bounces={false} showsVerticalScrollIndicator={false}>
				{entryType && <MonthTable />}
			</ScrollView>
		</View>
	);
};

export default MonthScreen;

const styles = StyleSheet.create({
	canvas: {
		height: 'calc(100vh - 64px)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		width: '80%',
		borderRadius: 30,
		padding: 20,
		backgroundColor: '#16161a',
	},
	container: {
		// display: 'flex',
		// justifyContent: 'space-between',
		// flexDirection: 'column',
		// alignItems: 'center',
		// textAlign: 'center',
	},
	row: {
		width: '100%',
		borderWidth: 1,
		borderColor: 'green',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	starting: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});
