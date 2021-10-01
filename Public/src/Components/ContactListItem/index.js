import { Link } from 'react-router-dom';

import Paths from '../../Configration/Paths';
import { MEDIA_HONST } from '../../Configration/defaults';

import './index.scss';

const index = ({ data }) => {
	const { about, name, avatar } = data.user;

	return (
		<li>
			<Link to={`${Paths.Chat}/${data.conversation}`}>
				<img src={`${MEDIA_HONST}${avatar}`} alt='' className='user_profile' />
				<div className='contact-details'>
					<h3 className='user_name'>{name}</h3>
					<p className='recent__chat'>{about}</p>
				</div>
			</Link>
		</li>
	);
};

export default index;
