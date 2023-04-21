import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOpen } from '../../redux/slices/navSlice';
import { logout } from '../../redux/slices/authSlice';
import { persistor } from '../../redux/rootStore';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import './navbar.scss';

const Navbar = () => {
	const { menuOpen } = useSelector((state) => state.nav);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleMenu = () => {
		dispatch(setMenuOpen());
	};

	const handleLogout = () => {
		dispatch(logout());
		persistor.purge();
	};

	return (
		<div className={menuOpen ? 'navbar active' : 'navbar'}>
			<div className='wrapper'>
				<div className='left'>
					{user ? (
						<h4>Hello, {user.name}!</h4>
					) : (
						<>
							<div className='item-container'>
								<PersonIcon className='icon' />
								<span>858-208-0560</span>
							</div>
							<div className='item-container'>
								<MailIcon className='icon' />
								<span>brandon@digitalkatana.dev</span>
							</div>
						</>
					)}
				</div>
				<div className='right'>
					{user ? (
						<Button color='inherit' onClick={handleLogout}>
							Logout
						</Button>
					) : (
						<div className='hamburger' onClick={handleMenu}>
							<span className='line1'></span>
							<span className='line2'></span>
							<span className='line3'></span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
