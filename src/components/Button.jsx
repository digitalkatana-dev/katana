import { StyleSheet } from 'react-native';
import { CircularProgress } from '@mui/material';

const Button = ({ type, label, loading, onClick }) => {
	return (
		<button style={styles.btn}>
			{loading ? <CircularProgress size={20} thickness={5} /> : label}
		</button>
	);
};

export default Button;

const styles = StyleSheet.create({
	btn: {
		marginTop: 10,
		padding: 8,
		borderRadius: 30,
		border: 'none',
		color: 'whitesmoke',
		backgroundColor: 'indigo',
	},
});
