import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOpen } from '../../redux/slices/navSlice';
import './menu.scss';

const Menu = () => {
	const { menuOpen } = useSelector((state) => state.nav);
	const dispatch = useDispatch();

	const handleMenu = () => {
		dispatch(setMenuOpen());
	};

	const menuItems = [
		{
			id: 0,
			href: '#intro',
			title: 'Home',
		},
		{
			id: 1,
			href: '#portfolio',
			title: 'Portfolio',
		},
		{
			id: 2,
			href: '#works',
			title: 'Works',
		},
		{
			id: 3,
			href: '#testimonials',
			title: 'Testimonials',
		},
		{
			id: 4,
			href: '#contact',
			title: 'Contact',
		},
	];

	return (
		<div className={menuOpen ? 'menu active' : 'menu'}>
			<ul>
				{menuItems.map((item) => (
					<li key={item.id} onClick={handleMenu}>
						<a href={item.href}>{item.title}</a>
					</li>
				))}
			</ul>
			<Link id='auth-link' to='/dashboard' onClick={handleMenu}>
				Login
			</Link>
		</div>
	);
};

export default Menu;
