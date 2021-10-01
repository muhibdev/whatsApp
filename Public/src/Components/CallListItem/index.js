import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { CallDirections, CallsErrors } from '../../Configration/States';
import { GenralFormate } from '../../Configration/DataTimeFormates';
import Paths from '../../Configration/Paths';

import './index.scss';

const index = ({ data }) => {
	const { user, call } = data;
	const { name, username, img } = user;
	const { time, direction, error } = call;
	const isMissed = direction === CallDirections.Incoming && error === CallsErrors.Missed;
	return (
		<li>
			<Link to={Paths.Camera}>
				<img src={img} alt={username} className='user_profile' />
				<div className='details'>
					<h3 className='user_name'>{name}</h3>
					<div className={`call-info ${isMissed ? 'miss-call' : ''}`}>
						<svg fill='currentColor' viewBox='0 0 476.213 476.213'>
							<path d='M345.606 107.5l-21.212 21.213 94.393 94.394H0v30h418.787L324.394 347.5l21.212 21.213 130.607-130.607z' />
						</svg>
						<h4 className='call-clunt'>(2)</h4>
						<div className='call-time'>
							<Moment format={GenralFormate}>{time}</Moment>
						</div>
					</div>
				</div>
				<div className='call-btn'>
					<svg fill='currentColor' viewBox='0 0 405.333 405.333'>
						<path d='M373.333 266.88c-25.003 0-49.493-3.904-72.704-11.563-11.328-3.904-24.192-.896-31.637 6.699l-46.016 34.752c-52.8-28.181-86.592-61.952-114.389-114.368l33.813-44.928c8.512-8.512 11.563-20.971 7.915-32.64-7.723-23.36-11.648-47.872-11.648-72.832 0-17.643-14.357-32-32-32H32C14.357 0 0 14.357 0 32c0 205.845 167.488 373.333 373.333 373.333 17.643 0 32-14.357 32-32V298.88c0-17.643-14.357-32-32-32z' />
					</svg>
				</div>
			</Link>
		</li>
	);
};

export default index;
