import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

import DropDown from '../../../Components/DropDown';
import { ChatList } from '../../../Configration/Menu';
import StickyOnTopScroll from '../../../Utils/StickyOnTopScroll';

const Header = () => {
	const headerRef = useRef('');
	StickyOnTopScroll(headerRef);
	/*  For styciy header */

	return (
		<header ref={headerRef}>
			<Link to='/' className='back-btn' hidden></Link>
			<Link to='/' className='profile-img' hidden></Link>
			<div className='title'>
				<h1 className='title-main'>WhatsApp</h1>
				<p className='title-sub' hidden></p>
			</div>
			<Link to='/' className='call-btn' hidden></Link>
			<Link to='/' className='search-btn'>
				<svg width='24' height='24'>
					<path
						fill='currentColor'
						d='M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z'
					/>
				</svg>
			</Link>
			<Link to='/' className='more-setting-btn'></Link>
			<DropDown menuItems={ChatList}>
				<svg width='24' height='24'>
					<path
						fill='currentColor'
						d='M12 7a2 2 0 10-.001-4.001A2 2 0 0012 7zm0 2a2 2 0 10-.001 3.999A2 2 0 0012 9zm0 6a2 2 0 10-.001 3.999A2 2 0 0012 15z'
					/>
				</svg>
			</DropDown>
		</header>
	);
};

export default Header;
