import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const TextInput = styled(TextField)({
	'& input': {
		color: 'whitesmoke',
		textAlign: 'center',
	},
	'& label': {
		color: 'whitesmoke',
	},
	'& label.Mui-focused': {
		color: 'green',
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: 'green',
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: 'indigo',
		},
		'&:hover fieldset': {
			borderColor: 'dodgerblue',
		},
		'&.Mui-focused fieldset': {
			borderColor: 'green',
		},
	},
});

export default TextInput;
