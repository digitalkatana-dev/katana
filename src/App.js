import React from 'react';
import { useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

function App() {
	const { user } = useSelector((state) => state.auth);

	return (
		<Router>
			<Routes></Routes>
		</Router>
	);
}

export default App;
