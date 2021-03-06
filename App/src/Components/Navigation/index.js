import { Link } from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Paths from '../../Configration/Paths';

import './index.scss';

const index = ({ history }) => {
	return (
		<Tabs>
			<Tab to={Paths.Camera} className='camera-btn'>
				<svg width='24' height='24' viewBox='0 0 471.04 471.04'>
					<path
						fill='currentColor'
						d='M414.72 112.64h-49.152l-27.136-40.96c-10.24-15.36-28.16-24.576-46.592-24.576H179.2c-18.432 0-36.352 9.216-46.592 24.576l-27.136 40.96H56.32A56.158 56.158 0 000 168.96v198.656a56.158 56.158 0 0056.32 56.32h358.4a56.158 56.158 0 0056.32-56.32V168.96a56.158 56.158 0 00-56.32-56.32zm-179.2 265.216c-70.144 0-126.976-56.832-126.976-126.976s56.832-126.464 126.976-126.464 126.976 56.832 126.976 126.976c0 69.632-56.832 126.464-126.976 126.464zM407.552 192h-22.528c-9.216-.512-16.384-8.192-15.872-17.408.512-8.704 7.168-15.36 15.872-15.872h20.48c9.216-.512 16.896 6.656 17.408 15.872.512 9.216-6.144 16.896-15.36 17.408z'
					/>
					<path
						fill='currentColor'
						d='M235.52 180.736c-38.912 0-70.656 31.744-70.656 70.656s31.744 70.144 70.656 70.144 70.656-31.744 70.656-70.656c0-38.912-31.744-70.144-70.656-70.144z'
					/>
				</svg>
			</Tab>
			<Tab to={Paths.ChatsList} className='chats-btn current'>
				CHATS <span id='total-unread__chats'>3</span>
			</Tab>
			<Tab to={Paths.Status} className='status-btn'>
				STATUS
			</Tab>
			<Tab to={Paths.CallsList} className='calls-btn'>
				CALLS
			</Tab>
		</Tabs>
	);
};

export default index;
