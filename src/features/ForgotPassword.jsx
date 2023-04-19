import { StyleSheet, Text, View } from 'react-native';
import { Card, CardContent, FormControl } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setEmail,
	setErrors,
	generatePasswordToken,
	clearSuccess,
	clearErrors,
} from '../redux/slices/authSlice';
import { validateForgotPassword } from '../util/validators';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

const ForgotPassword = () => {
	const { loading, email, success, errors } = useSelector(
		(state) => state.auth
	);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			email: email.toLowerCase(),
		};

		const { valid, errors } = validateForgotPassword(data);

		if (!valid) {
			dispatch(setErrors(errors));
		} else {
			dispatch(generatePasswordToken(data));
		}
	};

	useEffect(() => {
		if (success) {
			setTimeout(() => {
				dispatch(setEmail(''));
				dispatch(clearSuccess());
			}, 5000);
		}
	}, [dispatch, success]);

	return (
		<View style={styles.canvas}>
			<Card style={styles.card}>
				<CardContent style={styles.container}>
					<h5 style={styles.title}>Forgot Password</h5>
					<HelpOutlineIcon style={styles.question} fontSize='large' />
					<form onSubmit={handleSubmit}>
						<FormControl variant='standard'>
							{success ? (
								<View style={styles.success}>
									<CheckCircleOutlineIcon
										style={styles.icon}
										fontSize='large'
									/>
									<b>{success.message}</b>
								</View>
							) : errors && errors.auth ? (
								<View style={styles.fail}>
									<HighlightOffIcon style={styles.icon} fontSize='large' />
									<b>{errors.auth}</b>
								</View>
							) : (
								<Text style={styles.txt}>
									A link to reset your password will be sent to the email
									address associated with your account.
								</Text>
							)}
							<TextInput
								label='Email'
								size='small'
								margin='dense'
								fullWidth
								value={email}
								onChange={(e) => dispatch(setEmail(e.target.value))}
								onFocus={() => dispatch(clearErrors())}
							/>
							{errors && errors.email && (
								<h6 style={styles.error}>{errors.email}</h6>
							)}
							<Button type='submit' loading={loading} label='SEND EMAIL' />
						</FormControl>
					</form>
				</CardContent>
			</Card>
		</View>
	);
};

export default ForgotPassword;

const styles = StyleSheet.create({
	canvas: {
		height: 'calc(100vh - 64px)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		width: '30%',
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
	question: {
		color: 'steelblue',
		alignSelf: 'center',
	},
	icon: {
		alignSelf: 'center',
	},
	txt: {
		color: 'whitesmoke',
		textAlign: 'center',
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
