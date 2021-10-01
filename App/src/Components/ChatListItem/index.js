import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useEffect } from 'react';
import { ChatsState } from '../../Configration/States';
import { GenralFormate } from '../../Configration/DataTimeFormates';
import Paths from '../../Configration/Paths';

import { decryptData } from '../../Utils/Crypto';

import { MEDIA_HONST } from '../../Configration/defaults';

import './index.scss';

const Index = ({ conversation, me }) => {
	const { user } = conversation;

	useEffect(() => {
		if (conversation['latest-chat'].user === me) return;
		window.socket &&
			window.socket.emit('Chat Delivered', {
				id: conversation['latest-chat']._id,
				user: conversation['latest-chat'].user,
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [conversation, window?.socket?.connected]);

	if (conversation['latest-chat'].type !== 'text') return '';
	const showUnreadMsg =
		conversation['latest-chat'] && conversation['latest-chat'].user !== me && conversation['total-un-read'] !== 0;
	return (
		<li className={showUnreadMsg ? 'unread-msg' : ''}>
			<Link to={`${Paths.Chat}/${conversation._id}`}>
				<img src={`${MEDIA_HONST}${user.avatar}`} alt='' className='user_profile' />
				<div className='recent-chat-details'>
					<div>
						<h3 className='user_name'>{user.name}</h3>
						<p className='recent__chat'>{decryptData(conversation['latest-chat'].data.text)}</p>
					</div>
					<div>
						<div className='recent-chat_time'>
							<Moment format={GenralFormate}>{conversation['latest-chat'].time}</Moment>
						</div>
						<div className='mute-btn'>
							<svg width='16' height='18'>
								<path
									fill='currentColor'
									d='M11.52 9.206c0-1.4-.778-2.567-1.944-3.111v1.711L11.52 9.75v-.544zm1.945 0c0 .7-.156 1.4-.389 2.022l1.167 1.167c.544-.933.778-2.1.778-3.267 0-3.344-2.333-6.144-5.444-6.844v1.633c2.255.778 3.888 2.8 3.888 5.289zm-11.433-7L1.02 3.217l3.656 3.656H1.02v4.667h3.111l3.889 3.889v-5.211l3.344 3.344c-.544.389-1.089.7-1.789.933v1.633a6.64 6.64 0 002.878-1.4l1.556 1.556 1.011-1.011-7-7-5.988-6.067zm5.988.778L6.387 4.617 8.02 6.25V2.984z'
								/>
							</svg>
						</div>
						<div className='unread-chat-number'>{conversation['total-un-read']}</div>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default Index;
