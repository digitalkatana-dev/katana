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
import { setMonth } from '../../../../../redux/slices/accountingSlice';
import {
	rows,
	doTheMath,
	profit,
	totalExp,
	totalRev,
	totalProfit,
} from '../../../../../util/helpers';
import './annual.scss';

const AnnualTable = () => {
	const { selectedYear, year } = useSelector((state) => state.accounting);
	const dispatch = useDispatch();
	const months = year?.months;

	const handleLink = (data) => {
		dispatch(setMonth(data));
	};

	const tableData = (months) => {
		let monthly = [];

		const monthLink = (data) => (
			<Link onClick={() => handleLink(data)} className='link' to='/month'>
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
		<div>
			<TableContainer className='table' component={Paper}>
				<div className='header'>
					<h4 className='txt'>{selectedYear} Year Summary</h4>
				</div>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow>
							<TableCell align='center' className='txt'>
								Month
							</TableCell>
							<TableCell align='center' className='txt'>
								Expenses
							</TableCell>
							<TableCell align='center' className='txt'>
								Revenue
							</TableCell>
							<TableCell align='center' className='txt'>
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
								<TableCell align='center' className='txt'>
									{row.expenses}
								</TableCell>
								<TableCell align='center' className='txt'>
									{row.revenue}
								</TableCell>
								<TableCell align='center' className='txt'>
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
								className='txt'
							>
								Totals
							</TableCell>
							<TableCell align='center' className='txt'>{`$${totalExp(
								tableData(months)
							)}`}</TableCell>
							<TableCell align='center' className='txt'>{`$${totalRev(
								tableData(months)
							)}`}</TableCell>
							<TableCell align='center' className='txt'>{`$${totalProfit(
								tableData(months)
							)}`}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default AnnualTable;
