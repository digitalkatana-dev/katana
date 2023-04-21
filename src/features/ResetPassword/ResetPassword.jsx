import {
	Card,
	CardContent,
	FormControl,
	IconButton,
	InputAdornment,
} from '@mui/material';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	setPassword,
	setShow,
	resetPassword,
	clearSuccess,
	clearErrors,
} from '../../redux/slices/authSlice';
import LockResetIcon from '@mui/icons-material/LockReset';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import './reset.scss';

const ResetPassword = () => {
	const { loading, password, show, success, errors } = useSelector(
		(state) => state.auth
	);
	const dispatch = useDispatch();
	const location = useLocation();
	const path = location.pathname.split('/')[2];

	const handleSubmit = (e) => {
		e.preventDefault();
		const userData = {
			token: path,
			password,
		};

		dispatch(resetPassword(userData));
	};

	useEffect(() => {
		if (success) {
			setTimeout(() => {
				dispatch(setPassword(''));
				window.location.replace('/');
				dispatch(clearSuccess());
			}, 5000);
		}
	}, [dispatch, success]);

	return (
		<div className='canvas reset'>
			<Card className='card'>
				<CardContent className='container'>
					<h2 className='txt'>Reset Password</h2>
					<LockResetIcon className='title-icon blue' fontSize='large' />
					<form onSubmit={handleSubmit}>
						<FormControl variant='standard'>
							{success && (
								<div className='response-container success'>
									<CheckCircleOutlineIcon
										className='response-icon'
										fontSize='inherit'
									/>
									<b>{success.message}</b>
								</div>
							)}
							{errors && errors.token && (
								<div className='response-container fail'>
									<HighlightOffIcon
										className='response-icon'
										fontSize='inherit'
									/>
									<b>{errors.token}</b>
								</div>
							)}
							<TextInput
								type={show ? 'text' : 'password'}
								label='Password'
								size='small'
								margin='dense'
								fullWidth
								value={password}
								onChange={(e) => dispatch(setPassword(e.target.value))}
								onFocus={() => dispatch(clearErrors())}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												onClick={() => dispatch(setShow())}
												onMouseDown={(e) => e.preventDefault()}
												edge='end'
											>
												{show ? (
													<VisibilityOff className='visibility-icon' />
												) : (
													<Visibility className='visibility-icon' />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							<Button type='submit' loading={loading} label='RESET PASSWORD' />
						</FormControl>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default ResetPassword;

// const styles = StyleSheet.create({
// 	canvas: {
// 		height: 'calc(100vh - 64px)',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	card: {
// 		width: '30%',
// 		borderRadius: '50%',
// 		padding: 35,
// 		backgroundColor: '#16161a',
// 	},
// 	container: {
// 		display: 'flex',
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 		textAlign: 'center',
// 	},
// 	title: {
// 		color: 'whitesmoke',
// 	},
// 	lock: {
// 		color: 'steelblue',
// 		alignSelf: 'center',
// 	},
// 	icon: {
// 		alignSelf: 'center',
// 	},
// 	success: {
// 		color: 'green',
// 	},
// 	fail: {
// 		color: 'red',
// 	},
// 	link: {
// 		textDecorationLine: 'none',
// 		color: 'steelblue',
// 		fontSize: '.8rem',
// 		fontWeight: 'bold',
// 		marginTop: 10,
// 	},
// 	error: {
// 		textAlign: 'center',
// 		color: 'red',
// 	},
// });
