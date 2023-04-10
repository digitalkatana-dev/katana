import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Card, CardContent, IconButton } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	setEntryType,
	setShow,
	updateYear,
	setHidden,
	setStartBal,
	setTotalRev,
	setTotalExp,
	setMonth,
} from '../../../redux/slices/accountingSlice';
import { doTheMath, profit } from '../../../util/helpers';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MonthTable from '../components/MonthTable';
import TextInput from '../../../components/TextInput';

const MonthScreen = () => {
	const {
		// loading,
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

	const handleBack = () => {
		dispatch(setMonth(null));
		dispatch(setEntryType(''));
	};

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
			<Link style={styles.back} to='/accounting' onClick={handleBack}>
				Back
			</Link>
			<h4 style={styles.header}>{month.name + ' ' + selectedYear}</h4>
			<Card style={styles.card}>
				<CardContent style={styles.container}>
					<View style={styles.row}>
						<View style={styles.starting}>
							<Text style={styles.txt}>Starting Bal: </Text>
							{month.startBal === 0 && !show ? (
								<TouchableOpacity onPress={() => dispatch(setShow(true))}>
									<Text style={styles.txt}>Set Starting Bal</Text>
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
									<Text style={styles.txt}>${startBal}</Text>
								</TouchableOpacity>
							) : null}
							{!hidden && (
								<IconButton onClick={handleStartBal}>
									<AddCircleOutlineIcon style={styles.icon} />
								</IconButton>
							)}
						</View>
						<Text style={styles.txt}>Expenses: ${totalExp}</Text>
					</View>
					<View style={styles.overRev}>
						<Text style={styles.txt}>Revenue: ${totalRev}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.txt}>Ending Bal: ${endBal}</Text>
						<Text style={styles.txt}>
							Profit: ${profit(totalRev, totalExp)}
						</Text>
					</View>
				</CardContent>
			</Card>
			<select
				style={styles.select}
				onChange={(e) => handleChange('entryType', e.target.value)}
			>
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
		position: 'relative',
	},
	back: {
		position: 'absolute',
		top: 20,
		left: 30,
		color: 'dodgerblue',
		textDecorationLine: 'none',
	},
	header: {
		marginTop: 40,
		marginBottom: 20,
	},
	card: {
		width: '80%',
		borderRadius: 30,
		padding: 20,
		backgroundColor: '#16161a',
	},
	row: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	starting: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	txt: {
		color: 'whitesmoke',
	},
	icon: {
		color: 'green',
	},
	overRev: {
		marginVertical: 10,
		alignItems: 'flex-end',
	},
	select: {
		backgroundColor: '#16161a',
		borderRadius: 20,
		color: 'whitesmoke',
		fontSize: 15,
		marginTop: 15,
		marginBottom: 15,
		padding: 5,
		textAlign: 'center',
	},
});
