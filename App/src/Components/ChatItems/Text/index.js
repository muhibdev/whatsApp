import { useEffect } from 'react';
import Moment from 'react-moment';

import { GenralFormate } from '../../../Configration/DataTimeFormates';
import { ChatsState } from '../../../Configration/States';
import { decryptData } from '../../../Utils/Crypto';

import './index.scss';

const Index = ({ data, me, referance, members }) => {
	const {
		_id,
		time,
		user,
		status,
		conversation,
		data: { text },
	} = data;
	useEffect(() => {
		if (status !== ChatsState.READ && me !== user) {
			window.socket &&
				window.socket.emit('Chat Readed', {
					conversationID: conversation,
					user,
				});
		}
	}, []);
	return (
		<div ref={referance} className={`chat-item ${me === user ? 'my-chat' : 'other-chat'}`}>
			<div className='message'>{decryptData(text)}</div>
			<div className='info'>
				<span className='chat-time'>
					<Moment format={GenralFormate}>{time}</Moment>
				</span>
				<span className={status + ' status'}>{me === user ? <ShowChatStatus status={status} /> : ''}</span>
			</div>
		</div>
	);
};

const ShowChatStatus = ({ status }) => {
	if (status === ChatsState.SENDING)
		return (
			<svg id='sending' width='16' height='15'>
				<path
					fill='currentColor'
					d='M9.75 7.713H8.244V5.359a.5.5 0 00-.5-.5H7.65a.5.5 0 00-.5.5v2.947a.5.5 0 00.5.5h.094l.003-.001.003.002h2a.5.5 0 00.5-.5v-.094a.5.5 0 00-.5-.5zm0-5.263h-3.5c-1.82 0-3.3 1.48-3.3 3.3v3.5c0 1.82 1.48 3.3 3.3 3.3h3.5c1.82 0 3.3-1.48 3.3-3.3v-3.5c0-1.82-1.48-3.3-3.3-3.3zm2 6.8a2 2 0 01-2 2h-3.5a2 2 0 01-2-2v-3.5a2 2 0 012-2h3.5a2 2 0 012 2v3.5z'
				/>
			</svg>
		);
	else if (status === ChatsState.PENDING)
		return (
			<svg id='pending' viewBox='0 0 16 15' width='16' height='15' className=''>
				<path
					fill='currentColor'
					d='M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z'></path>
			</svg>
		);

	return (
		<svg id='delivered' viewBox='0 0 16 15' width='16' height='15' className=''>
			<path
				fill='currentColor'
				d='M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z'></path>
		</svg>
	);
};

export default Index;
