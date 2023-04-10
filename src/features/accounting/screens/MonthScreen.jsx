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
import {
	setEntryType,
	setShow,
	updateYear,
	setHidden,
	setStartBal,
	setTotalRev,
	setTotalExp,
} from '../../../redux/slices/accountingSlice';
import { doTheMath, profit } from '../../../util/helpers';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MonthTable from '../components/MonthTable';
import TextInput from '../../../components/TextInput';

const MonthScreen = () => {
	const {
		loading,
		selectedYear,
		year,
		month,
		show,
		startBal,
		hidden,
		entryType,
		totalExp,
		totalRev,
	} = useSelector((state) => state.accounting);
	const dispatch = useDispatch();
	const start = parseFloat(month.startBal);
	const pro = parseFloat(profit(totalRev, totalExp));
	const endBal = start + pro;
	const balInput = useRef(null);

	const handleChange = (input, value) => {
		switch (input) {
			case 'startBal':
				dispatch(setStartBal(value));
				break;

			case 'entryType':
				dispatch(setEntryType(value));
				break;

			default:
				break;
		}
	};

	const handleStartBal = () => {
		const data = {
			yearId: year._id,
			year: year.year,
			monthId: month._id,
			month: month.name,
			startBal,
		};
		dispatch(updateYear(data));
		dispatch(setHidden(true));
		dispatch(setShow());
		balInput.current.blur();
	};

	useEffect(() => {
		dispatch(setTotalExp(doTheMath(month?.expenses)));
		dispatch(setTotalRev(doTheMath(month?.revenue)));
		dispatch(setStartBal(month?.startBal));
	}, [dispatch, month]);

	return (
		<View style={styles.canvas}>
			<Text>{month.name + ' ' + selectedYear}</Text>
			<Card style={styles.card}>
				<CardContent style={styles.container}>
					<View style={styles.row}>
						<View style={styles.starting}>
							<Text>Starting Bal: </Text>
							{month.startBal === 0 && !show ? (
								<TouchableOpacity onPress={() => dispatch(setShow(true))}>
									<Text>Set Starting Bal</Text>
								</TouchableOpacity>
							) : show ? (
								<TextInput
									ref={balInput}
									size='small'
									margin='dense'
									value={startBal}
									onChange={(e) => handleChange('startBal', e.target.value)}
									onFocus={() => dispatch(setHidden(false))}
								/>
							) : month.startBal !== 0 ? (
								<TouchableOpacity onPress={() => dispatch(setShow())}>
									<Text>${startBal}</Text>
								</TouchableOpacity>
							) : null}
							{!hidden && (
								<IconButton onClick={handleStartBal}>
									<AddCircleOutlineIcon />
								</IconButton>
							)}
						</View>
						<Text>Expenses: ${totalExp}</Text>
					</View>
					<View style={styles.row}>
						<Text>Revenue: ${totalRev}</Text>
					</View>
					<View style={styles.row}>
						<Text>Ending Bal: ${endBal}</Text>
						<Text>Profit: ${profit(totalRev, totalExp)}</Text>
					</View>
				</CardContent>
			</Card>
			<select onChange={(e) => handleChange('entryType', e.target.value)}>
				<option value=''>Choose...</option>
				<option value='Expenses'>Expenses</option>
				<option value='Revenue'>Revenue</option>
			</select>
			<ScrollView>{entryType && <MonthTable />}</ScrollView>
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
