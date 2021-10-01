import { useState } from 'react';

import { Link } from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

import Conversation from '../Conversation';
import Status from '../Status';
import CallsList from '../CallsList';

import Paths from '../../Configration/Paths';

import Layout from '../../Layout/Tabs';

import './index.scss';

const unreadTotalChats = 1;
const unSeenStatus = false;

const Index = () => {
	const [index, setindex] = useState(0);
	const handleChange = (event, value) => {
		setindex(value);
	};

	const handleChangeIndex = (index) => {
		setindex(index);
	};
	return (
		<Layout>
			<div className='nav'>
				<Link to={Paths.Camera}>
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
				</Link>
				<Tabs value={index} onChange={handleChange}>
					<Tab label='CHATS' className={unreadTotalChats ? 'unread-chats' : ''} data-unread-msg={unreadTotalChats} />
					<Tab label='STATUS' className={unSeenStatus ? 'un-seen-status' : ''} />
					<Tab label='CALLS' />
				</Tabs>
			</div>
			<SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
				<Conversation />
				<Status />
				<CallsList />
			</SwipeableViews>
		</Layout>
	);
};

export default Index;

// export default DemoTabs;
