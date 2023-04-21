import { Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import './dashboard.scss';

const Dashboard = () => {
	return (
		<div className='canvas dash'>
			<Card className='card'>
				<CardContent className='container'>
					<h2 className='txt'>What Do You Want To Do?</h2>
					<hr className='hr' />
					<div>
						<Link className='link' to='/accounting'>
							Accounting
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Dashboard;
