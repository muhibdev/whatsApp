import { Link } from 'react-router-dom';

import Paths from '../../Configration/Paths';

import './index.scss';

const index = () => {
	return (
		<Link to={Paths.ContactsList} className='contact-list-btn'>
			<svg width='24' height='24'>
				<path
					fill='currentColor'
					d='M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z'
				/>
			</svg>
		</Link>
	);
};

export default index;
