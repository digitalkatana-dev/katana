import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

const MonthScreen = () => {
	const { month } = useSelector((state) => state.accounting);

	return (
		<View style={styles.canvas}>
			<Text>{month.name}</Text>
		</View>
	);
};

export default MonthScreen;

const styles = StyleSheet.create({
	canvas: {
		height: 'calc(100vh - 64px)',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
