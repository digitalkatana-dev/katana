import { StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	setSelectedYear,
	getYear,
} from '../../../redux/slices/accountingSlice';
import { yearOptions } from '../../../util/helpers';
import HomeTable from '../components/HomeTable';

const AccountingHomeScreen = () => {
	const { loading, selectedYear, year } = useSelector(
		(state) => state.accounting
	);
	const dispatch = useDispatch();

	const handleSelect = (e) => {
		dispatch(setSelectedYear(e.target.value));
		if (e.target.value !== '') {
			dispatch(getYear(e.target.value));
		}
	};

	useEffect(() => {
		if (!year) {
			dispatch(getYear());
		}
	}, [dispatch, year]);

	return (
		<View style={styles.canvas}>
			<Link style={styles.back} to='/'>
				Back
			</Link>
			<select
				style={styles.select}
				value={selectedYear}
				onChange={handleSelect}
			>
				<option value=''>Select a Year</option>
				{yearOptions().map((item) => (
					<option key={item.label} value={item.value}>
						{item.label}
					</option>
				))}
			</select>
			<HomeTable />
		</View>
	);
};

export default AccountingHomeScreen;

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
