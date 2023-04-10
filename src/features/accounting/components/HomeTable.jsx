import { StyleSheet, Text, View } from 'react-native';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setMonth } from '../../../redux/slices/accountingSlice';
import {
	rows,
	doTheMath,
	profit,
	totalExp,
	totalRev,
	totalProfit,
} from '../../../util/helpers';
import React from 'react';

const HomeTable = () => {
	const { selectedYear, year } = useSelector((state) => state.accounting);
	const dispatch = useDispatch();
	const months = year?.months;

	const handleLink = (data) => {
		dispatch(setMonth(data));
	};

	const tableData = (months) => {
		let monthly = [];

		const monthLink = (data) => (
			<Link onClick={() => handleLink(data)} style={styles.link} to='/month'>
				{data.name}
			</Link>
		);

		months?.forEach((item) => {
			const rev = doTheMath(item.revenue);
			const exp = doTheMath(item.expenses);
			monthly.push({
				_id: item._id,
				name: monthLink(item),
				expenses: `$${exp}`,
				revenue: `$${rev}`,
				profit: `$${profit(rev, exp)}`,
			});
		});
		return monthly;
	};

	return (
		<View>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<Text style={styles.txt}>{selectedYear} Year Summary</Text>
					</TableHead>
					<TableHead>
						<TableRow>
							<TableCell align='center'>Month</TableCell>
							<TableCell align='center'>Expenses</TableCell>
							<TableCell align='center'>Revenue</TableCell>
							<TableCell align='center'>Profit</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows(tableData(months)).map((row) => (
							<TableRow
								key={row.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row' align='center'>
									{row.month}
								</TableCell>
								<TableCell align='center'>{row.expenses}</TableCell>
								<TableCell align='center'>{row.revenue}</TableCell>
								<TableCell align='center'>{row.profit}</TableCell>
							</TableRow>
						))}
						<TableRow>
							<TableCell component='th' scope='row' align='center'>
								Totals
							</TableCell>
							<TableCell align='center'>{`$${totalExp(
								tableData(months)
							)}`}</TableCell>
							<TableCell align='center'>{`$${totalRev(
								tableData(months)
							)}`}</TableCell>
							<TableCell align='center'>{`$${totalProfit(
								tableData(months)
							)}`}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</View>
	);
};

export default HomeTable;

const styles = StyleSheet.create({
	link: {
		textDecorationLine: 'none',
		color: 'steelblue',
		fontSize: '.8rem',
		fontWeight: 'bold',
		marginTop: 10,
	},
});
