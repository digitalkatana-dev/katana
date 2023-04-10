import { StyleSheet, View } from 'react-native';
import { Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
	return (
		<View style={styles.canvas}>
			<Card style={styles.card}>
				<CardContent style={styles.container}>
					<h2 style={styles.title}>What Do You Want To Do?</h2>
					<View style={styles.hr} />
					<View>
						<Link style={styles.link} to='/accounting'>
							Accounting
						</Link>
					</View>
				</CardContent>
			</Card>
		</View>
	);
};

export default Dashboard;

const styles = StyleSheet.create({
	canvas: {
		height: 'calc(100vh - 64px)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		borderRadius: 30,
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
	hr: {
		width: '100%',
		borderBottomWidth: 2,
		borderBottomColor: 'whitesmoke',
		marginVertical: 5,
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
