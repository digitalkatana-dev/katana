import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../redux/slices/accountingSlice';

const Alert = ({ alertType }) => {
	const { open, dialogTxt } = useSelector((state) => state.accounting);
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(setOpen());
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{alertType}:</DialogTitle>
			<DialogContent>
				<DialogContentText style={{ textAlign: 'center' }}>
					{dialogTxt}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Ok</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Alert;
