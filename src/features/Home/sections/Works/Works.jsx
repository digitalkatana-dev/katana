import { useState } from 'react';
import { worksData } from '../../data';
import LeftArrowIcon from '@mui/icons-material/KeyboardArrowLeft';
import RightArrowIcon from '@mui/icons-material/KeyboardArrowRight';
import './works.scss';

const Works = () => {
	const [selected, setSelected] = useState(0);

	const handleClick = (way) => {
		way === 'left'
			? setSelected(selected > 0 ? selected - 1 : 2)
			: setSelected(selected < worksData.length - 1 ? selected + 1 : 0);
	};

	return (
		<div id='works'>
			<div
				className='slider'
				style={{ transform: `translateX(-${selected * 100}vw)` }}
			>
				{worksData.map((data) => (
					<div key={data.id} className='slider-item-container'>
						<div className='item'>
							<div className='left'>
								<div className='left-container'>
									<div className='icon-container'>{data.icon}</div>
									<h2>{data.title}</h2>
									<p>{data.desc}</p>
									<span>Projects</span>
								</div>
							</div>
							<div className='right'>
								<img src={data.img} alt='' />
							</div>
						</div>
					</div>
				))}
			</div>
			<LeftArrowIcon
				className='slider-arrow left'
				onClick={() => handleClick('left')}
			/>
			<RightArrowIcon
				className='slider-arrow right'
				onClick={() => handleClick('right')}
			/>
		</div>
	);
};

export default Works;
