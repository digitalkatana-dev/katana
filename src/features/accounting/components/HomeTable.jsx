import { StyleSheet, View } from 'react-native';
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
			<TableContainer style={styles.table} component={Paper}>
				<div style={styles.header}>
					<h4 style={styles.txt}>{selectedYear} Year Summary</h4>
				</div>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow>
							<TableCell align='center' style={styles.cell}>
								Month
							</TableCell>
							<TableCell align='center' style={styles.cell}>
								Expenses
							</TableCell>
							<TableCell align='center' style={styles.cell}>
								Revenue
							</TableCell>
							<TableCell align='center' style={styles.cell}>
								Profit
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows(tableData(months)).map((row) => (
							<TableRow key={row.id}>
								<TableCell component='th' scope='row' align='center'>
									{row.month}
								</TableCell>
								<TableCell align='center' style={styles.cell}>
									{row.expenses}
								</TableCell>
								<TableCell align='center' style={styles.cell}>
									{row.revenue}
								</TableCell>
								<TableCell align='center' style={styles.cell}>
									{row.profit}
								</TableCell>
							</TableRow>
						))}
						<TableRow
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell
								component='th'
								scope='row'
								align='center'
								style={styles.cell}
							>
								Totals
							</TableCell>
							<TableCell align='center' style={styles.cell}>{`$${totalExp(
								tableData(months)
							)}`}</TableCell>
							<TableCell align='center' style={styles.cell}>{`$${totalRev(
								tableData(months)
							)}`}</TableCell>
							<TableCell align='center' style={styles.cell}>{`$${totalProfit(
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
	table: {
		backgroundColor: '#16161a',
	},
	header: {
		border: '2px solid indigo',
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		color: 'whitesmoke',
		padding: 10,
		textAlign: 'center',
	},
	cell: {
		color: 'whitesmoke',
	},
	link: {
		textDecorationLine: 'none',
		color: 'steelblue',
		fontSize: '.8rem',
		fontWeight: 'bold',
		marginTop: 10,
	},
});
