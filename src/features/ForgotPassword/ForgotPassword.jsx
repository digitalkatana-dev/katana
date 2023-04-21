import { Card, CardContent, FormControl } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setEmail,
	setErrors,
	generatePasswordToken,
	clearSuccess,
	clearErrors,
} from '../../redux/slices/authSlice';
import { validateForgotPassword } from '../../util/validators';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import './forgot.scss';

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
		<div className='canvas forgot'>
			<Card className='card'>
				<CardContent className='container'>
					<h2 className='txt'>Forgot Password</h2>
					<HelpOutlineIcon className='title-icon blue' fontSize='large' />
					<form onSubmit={handleSubmit}>
						<FormControl variant='standard'>
							{success ? (
								<div className='response-container success'>
									<CheckCircleOutlineIcon
										className='response-icon'
										fontSize='inherit'
									/>
									<b>{success.message}</b>
								</div>
							) : errors && errors.auth ? (
								<div className='response-container fail'>
									<HighlightOffIcon
										className='response-icon'
										fontSize='inherit'
									/>
									<b>{errors.auth}</b>
								</div>
							) : (
								<h6 className='txt'>
									A link to reset your password will be sent to the email
									address associated with your account.
								</h6>
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
								<h6 className='error'>{errors.email}</h6>
							)}
							<Button type='submit' loading={loading} label='SEND EMAIL' />
						</FormControl>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default ForgotPassword;
