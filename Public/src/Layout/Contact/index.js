import { Link } from 'react-router-dom';
import './index.scss';

const index = ({ contactLength }) => {
	return (
		<header className='contact-header'>
			<Link to='/' className='back-btn'>
				<svg width='24' height='24' fill='currentColor' viewBox='0 0 447.243 447.243'>
					<path d='M420.361 192.229a31.967 31.967 0 00-5.535-.41H99.305l6.88-3.2a63.998 63.998 0 0018.08-12.8l88.48-88.48c11.653-11.124 13.611-29.019 4.64-42.4-10.441-14.259-30.464-17.355-44.724-6.914a32.018 32.018 0 00-3.276 2.754l-160 160c-12.504 12.49-12.515 32.751-.025 45.255l.025.025 160 160c12.514 12.479 32.775 12.451 45.255-.063a32.084 32.084 0 002.745-3.137c8.971-13.381 7.013-31.276-4.64-42.4l-88.32-88.64a64.002 64.002 0 00-16-11.68l-9.6-4.32h314.24c16.347.607 30.689-10.812 33.76-26.88 2.829-17.445-9.019-33.88-26.464-36.71z' />
				</svg>
			</Link>

			<Link to='' className='title'>
				<h1 className='title-main'>Select contact</h1>
				<p className='title-sub'>{contactLength} contacts</p>
			</Link>
			<Link to='/' className='search-btn'>
				<svg width='24' height='24'>
					<path
						fill='currentColor'
						d='M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z'
					/>
				</svg>
			</Link>
			<Link to='/' className='more-setting-btn'>
				<svg width='24' height='24'>
					<path
						fill='currentColor'
						d='M12 7a2 2 0 10-.001-4.001A2 2 0 0012 7zm0 2a2 2 0 10-.001 3.999A2 2 0 0012 9zm0 6a2 2 0 10-.001 3.999A2 2 0 0012 15z'
					/>
				</svg>
			</Link>
		</header>
	);
};

export default index;
