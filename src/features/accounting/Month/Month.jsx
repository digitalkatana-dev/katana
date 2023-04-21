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
import MonthTable from './components/MonthTable';
import TouchableOpacity from '../../../components/TouchableOpacity';
import TextInput from '../../../components/TextInput';
import './month.scss';

const Month = () => {
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
		<div className='canvas month'>
			<Link className='link back' to='/accounting' onClick={handleBack}>
				Back
			</Link>
			<h4 className='txt header'>{month.name + ' ' + selectedYear}</h4>
			<Card className='card'>
				<CardContent className='container'>
					<div className='row'>
						<div className='starting'>
							<h4 className='txt'>Starting Bal: </h4>
							{month.startBal === 0 && !show ? (
								<TouchableOpacity onClick={() => dispatch(setShow(true))}>
									<h4 className='txt'>Set Starting Bal</h4>
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
								<TouchableOpacity onClick={() => dispatch(setShow())}>
									<h4 className='txt'>${startBal}</h4>
								</TouchableOpacity>
							) : null}
							{!hidden && (
								<IconButton onClick={handleStartBal}>
									<AddCircleOutlineIcon className='icon' />
								</IconButton>
							)}
						</div>
						<h4 className='txt'>Expenses: ${totalExp}</h4>
					</div>
					<div className='rev'>
						<h4 className='txt'>Revenue: ${totalRev}</h4>
					</div>
					<div className='row'>
						<h4 className='txt'>Ending Bal: ${endBal}</h4>
						<h4 className='txt'>Profit: ${profit(totalRev, totalExp)}</h4>
					</div>
				</CardContent>
			</Card>
			<select
				className='select'
				onChange={(e) => handleChange('entryType', e.target.value)}
			>
				<option value=''>Choose...</option>
				<option value='Expenses'>Expenses</option>
				<option value='Revenue'>Revenue</option>
			</select>
			<div>{entryType && <MonthTable />}</div>
		</div>
	);
};

export default Month;
