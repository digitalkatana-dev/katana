import { StyleSheet, View } from 'react-native';
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
} from '../redux/slices/authSlice';
import LockResetIcon from '@mui/icons-material/LockReset';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import React from 'react';

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
		<View style={styles.canvas}>
			<Card style={styles.card}>
				<CardContent style={styles.container}>
					<h5 style={styles.title}>Reset Password</h5>
					<LockResetIcon style={styles.lock} fontSize='large' />
					<form onSubmit={handleSubmit}>
						<FormControl variant='standard'>
							{success && (
								<View style={styles.success}>
									<CheckCircleOutlineIcon
										style={styles.icon}
										fontSize='large'
									/>
									<b>{success.message}</b>
								</View>
							)}
							{errors && errors.token && (
								<View style={styles.fail}>
									<HighlightOffIcon style={styles.icon} fontSize='large' />
									<b>{errors.token}</b>
								</View>
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
												aria-label='toggle password visibility'
												onClick={() => dispatch(setShow())}
												onMouseDown={(e) => e.preventDefault()}
												edge='end'
											>
												{show ? <VisibilityOff /> : <Visibility />}
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
		</View>
	);
};

export default ResetPassword;

const styles = StyleSheet.create({
	canvas: {
		height: 'calc(100vh - 64px)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		width: '65%',
		borderRadius: '50%',
		padding: 35,
		backgroundColor: '#16161a',
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',
	},
	title: {
		color: 'whitesmoke',
	},
	lock: {
		color: 'steelblue',
		alignSelf: 'center',
	},
	icon: {
		alignSelf: 'center',
	},
	success: {
		color: 'green',
	},
	fail: {
		color: 'red',
	},
	link: {
		textDecorationLine: 'none',
		color: 'steelblue',
		fontSize: '.8rem',
		fontWeight: 'bold',
		marginTop: 10,
	},
	error: {
		textAlign: 'center',
		color: 'red',
	},
});
