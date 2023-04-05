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
import ForgotPassword from './features/ForgotPassword';
import ResetPassword from './features/ResetPassword';
import Dashboard from './features/Dashboard';
import AccountingHomeScreen from './features/accounting/screens/AccountingHomeScreen';
import MonthScreen from './features/accounting/screens/MonthScreen';

function App() {
	const { user } = useSelector((state) => state.auth);

	return (
		<Router>
			<Navbar />
			<Routes>
				{user ? (
					<>
						<Route path='/' element={<Dashboard />} />
						<Route path='/accounting' element={<AccountingHomeScreen />} />
						<Route path='/month' element={<MonthScreen />} />
					</>
				) : (
					<>
						<Route path='/' element={<Auth />} />
						<Route path='/forgot-password' element={<ForgotPassword />} />
						<Route path='/reset-password/:id' element={<ResetPassword />} />
					</>
				)}
			</Routes>
		</Router>
	);
}

export default App;
