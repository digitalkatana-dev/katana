import React from 'react';
import { useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './features/Auth';
import ResetPassword from './features/ResetPassword';

function App() {
	const { user } = useSelector((state) => state.auth);

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/' element={<Auth />} />
				<Route path='/reset-password/:id' element={<ResetPassword />} />
			</Routes>
		</Router>
	);
}

export default App;
