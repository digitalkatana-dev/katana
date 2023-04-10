import { StyleSheet } from 'react-native';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../redux/slices/accountingSlice';
import React from 'react';

const Alert = () => {
	const { open, dialogTxt } = useSelector((state) => state.accounting);
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(setOpen());
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Notes:</DialogTitle>
			<DialogContent>
				<DialogContentText style={styles.txt}>{dialogTxt}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Ok</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Alert;

const styles = StyleSheet.create({
	txt: {
		textAlign: 'center',
	},
});
