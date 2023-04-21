import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { persistor } from '../redux/rootStore';

const Navbar = () => {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		persistor.purge();
	};

	return (
		<AppBar position='static'>
			<Toolbar>
				{user ? (
					<>
						<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
							Hello, {user.name}!
						</Typography>
						<Button color='inherit' onClick={handleLogout}>
							Logout
						</Button>
					</>
				) : (
					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1, textAlign: 'center' }}
					>
						digitalkatana.dev
					</Typography>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
