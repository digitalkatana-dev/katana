import Intro from './sections/Intro';
import Portfolio from './sections/Portfolio';
import Works from './sections/Works';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import './home.scss';

const Home = () => {
	return (
		<div id='home'>
			<Intro />
			<Portfolio />
			<Works />
			<Testimonials />
			<Contact />
		</div>
	);
};

export default Home;
