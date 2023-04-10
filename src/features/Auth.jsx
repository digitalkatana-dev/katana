import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
	Card,
	CardContent,
	FormControl,
	IconButton,
	InputAdornment,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	register,
	login,
	setAuthType,
	setName,
	setEmail,
	setPassword,
	setShow,
	clearErrors,
} from '../redux/slices/authSlice';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

const Auth = () => {
	const { loading, authType, name, email, password, show, errors } =
		useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleChange = (input, value) => {
		switch (input) {
			case 'toggle':
				dispatch(clearErrors());
				dispatch(setAuthType(value));
				break;

			case 'name':
				dispatch(setName(value));
				break;

			case 'email':
				dispatch(setEmail(value));
				break;

			case 'password':
				dispatch(setPassword(value));
				break;

			default:
				break;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			email: email.toLowerCase(),
			password,
		};

		switch (authType) {
			case 'Login':
				dispatch(login(data));
				break;

			case 'Register':
				data.name = name;
				dispatch(register(data));
				break;

			default:
				break;
		}
	};

	return (
		<View style={styles.canvas}>
			<Card style={styles.card}>
				<CardContent style={styles.container}>
					<TouchableOpacity
						onPress={() =>
							handleChange(
								'toggle',
								authType === 'Login' ? 'Register' : 'Login'
							)
						}
					>
						<h2 style={styles.title}>{authType}</h2>
						{authType === 'Register' ? (
							<PersonAddIcon style={styles.icon} fontSize='large' />
						) : (
							<LoginIcon style={styles.icon} fontSize='large' />
						)}
					</TouchableOpacity>
					<form onSubmit={handleSubmit}>
						<FormControl variant='standard'>
							{authType === 'Register' && (
								<>
									<TextInput
										label='Name'
										size='small'
										margin='dense'
										fullWidth
										value={name}
										onChange={(e) => handleChange('name', e.target.value)}
										onFocus={() => dispatch(clearErrors)}
									/>
									{errors && errors.name && (
										<h6 style={styles.error}>{errors.name}</h6>
									)}
								</>
							)}
							<TextInput
								label='Email'
								size='small'
								margin='dense'
								fullWidth
								value={email}
								onChange={(e) => handleChange('email', e.target.value)}
								onFocus={() => dispatch(clearErrors)}
							/>
							{errors && errors.email && (
								<h6 style={styles.error}>{errors.email}</h6>
							)}
							<TextInput
								type={show ? 'text' : 'password'}
								label='Password'
								size='small'
								margin='dense'
								fullWidth
								value={password}
								onChange={(e) => handleChange('password', e.target.value)}
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
												{show ? (
													<VisibilityOff style={styles.viewIcon} />
												) : (
													<Visibility style={styles.viewIcon} />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							{errors && errors.password && (
								<h6 className='error'>{errors.password}</h6>
							)}
							<Button type='submit' loading={loading} label='SUBMIT' />
						</FormControl>
					</form>
					<Link style={styles.link} to='/forgot-password'>
						Forgot Password
					</Link>
				</CardContent>
			</Card>
		</View>
	);
};

export default Auth;

const styles = StyleSheet.create({
	canvas: {
		height: 'calc(100vh - 64px)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		borderRadius: '50%',
		padding: 35,
		backgroundColor: '#16161a',
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	title: {
		color: 'whitesmoke',
	},
	icon: {
		color: 'green',
		alignSelf: 'center',
	},
	viewIcon: {
		color: 'grey',
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
