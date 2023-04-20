import { useEffect, useState } from 'react';
import { headers, featured, web, mobile, design, branding } from '../../data';
import './portfolio.scss';

const Portfolio = () => {
	const [selected, setSelected] = useState('featured');
	const [data, setData] = useState([]);

	useEffect(() => {
		switch (selected) {
			case 'featured':
				setData(featured);
				break;

			case 'web':
				setData(web);
				break;

			case 'mobile':
				setData(mobile);
				break;

			case 'design':
				setData(design);
				break;

			case 'branding':
				setData(branding);
				break;

			default:
				setData(featured);
		}
	}, [selected]);

	return (
		<div id='portfolio'>
			<h2>Portfolio</h2>
			<ul>
				{headers.map((header) => (
					<li
						key={header.id}
						className={selected === header.id ? 'active' : null}
						onClick={() => setSelected(header.id)}
					>
						{header.title}
					</li>
				))}
			</ul>
			<div className='portfolio-item-container'>
				{data.map((project) => (
					<div key={project.id} className='item'>
						<img src={project.img} alt='' />
						<h4>{project.title}</h4>
					</div>
				))}
			</div>
		</div>
	);
};

export default Portfolio;
