import './contact.scss';

const Contact = () => {
	return (
		<div id='contact'>
			<div className='left'>
				<img src='/shake.svg' alt='' />
			</div>
			<div className='right'>
				<h2>Contact</h2>
				<form>
					<input type='text' placeholder='Email' />
					<textarea
						name=''
						id=''
						cols='30'
						rows='10'
						placeholder='Message'
					></textarea>
					<button>Send</button>
				</form>
			</div>
		</div>
	);
};

export default Contact;
