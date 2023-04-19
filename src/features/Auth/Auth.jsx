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
} from '../../redux/slices/authSlice';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TouchableOpacity from '../../components/TouchableOpacity';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import './auth.scss';

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
		<div id='canvas'>
			<Card className='card'>
				<CardContent className='container'>
					<TouchableOpacity
						onClick={() =>
							handleChange(
								'toggle',
								authType === 'Login' ? 'Register' : 'Login'
							)
						}
					>
						<h2 className='auth-type'>{authType}</h2>
						{authType === 'Register' ? (
							<PersonAddIcon className='icon' fontSize='large' />
						) : (
							<LoginIcon className='icon' fontSize='large' />
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
										value={name}
										onChange={(e) => handleChange('name', e.target.value)}
										onFocus={() => dispatch(clearErrors())}
									/>
									{errors && errors.name && (
										<h6 className='error'>{errors.name}</h6>
									)}
								</>
							)}
							<TextInput
								label='Email'
								size='small'
								margin='dense'
								value={email}
								onChange={(e) => handleChange('email', e.target.value)}
								onFocus={() => dispatch(clearErrors())}
							/>
							{errors && errors.email && (
								<h6 className='error'>{errors.email}</h6>
							)}
							<TextInput
								type={show ? 'text' : 'password'}
								label='Password'
								size='small'
								margin='dense'
								value={password}
								onChange={(e) => handleChange('password', e.target.value)}
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
<<<<<<< HEAD:src/features/Auth/Auth.jsx
													<VisibilityOff className='visibility-icon' />
												) : (
													<Visibility className='visibility-icon' />
=======
													<VisibilityOff style={styles.viewIcon} />
												) : (
													<Visibility style={styles.viewIcon} />
>>>>>>> bf7a6bfc81424e6b25e87cb4b7a07d4d152d39c7:src/features/Auth.jsx
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
					<Link className='link' to='/forgot-password'>
						Forgot Password
					</Link>
				</CardContent>
			</Card>
		</div>
	);
};

export default Auth;
<<<<<<< HEAD:src/features/Auth/Auth.jsx
=======

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
>>>>>>> bf7a6bfc81424e6b25e87cb4b7a07d4d152d39c7:src/features/Auth.jsx
