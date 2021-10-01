import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { GenralFormate } from '../../Configration/DataTimeFormates';

import './index.scss';

const index = ({ data }) => {
	const { name, avatar, statuses } = data;
	const totleStatus = statuses.length;
	const lastStatus = statuses[statuses.length - 1];

	return (
		<Link to='/' className='status' data-statu-num={totleStatus}>
			<img src={avatar} alt={name} className='user_profile' />
			<div className='info'>
				<h3 className='status-title'>{name}</h3>
				<p>
					<Moment format={GenralFormate}>{lastStatus.time}</Moment>
				</p>
			</div>
		</Link>
	);
};

export default index;
