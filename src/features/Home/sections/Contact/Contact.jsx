import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setMessage } from '../../../../redux/slices/contactSlice';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import './contact.scss';

const Contact = () => {
	const { email, message } = useSelector((state) => state.contact);
	const dispatch = useDispatch();

	const handleChange = (input, value) => {
		switch (input) {
			case 'email':
				dispatch(setEmail(value));
				break;

			case 'message':
				dispatch(setMessage(value));
				break;

			default:
				break;
		}
	};

	return (
		<div id='contact'>
			<div className='left'>
				<img src='/shake.svg' alt='' />
			</div>
			<div className='right'>
				<h2>Contact</h2>
				<form>
					<TextInput
						label='Email'
						size='small'
						margin='dense'
						value={email}
						onChange={(e) => handleChange('email', e.target.value)}
					/>
					<TextInput
						label='Message'
						size='small'
						margin='dense'
						multiline
						rows={10}
						value={message}
						onChange={(e) => handleChange('message', e.target.value)}
					/>
					<Button type='submit' label='Send' />
				</form>
			</div>
		</div>
	);
};

export default Contact;
