/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import useFatchAction from '../../Hooks/useFatchAction';
import { getAllChats, clearCurrentConversation } from '../../Redux/Chats/actions';
import { useShallowEqualSelector, useActions } from '../../Hooks/Redux';
import { withRouter } from 'react-router-dom';

import ChatLayout from '../../Layout/Chat';
import SecutityMessage from '../../Components/SecutityMessage';
import TextChat from '../../Components/ChatItems/Text';
import AddChat from './AddChat';
import Loading from '../../Components/Loading';

import './index.scss';

import BackgroundImg from './img/bg-chat-tile-dark.png';
const bgStyle = { backgroundImage: `url('${BackgroundImg}')` };

const Index = ({ match }) => {
	const chatListItem = useRef('');
	const ClearCurrentConversation = useActions(clearCurrentConversation);

	const { loading } = useFatchAction(getAllChats, {
		arg: [match?.params?.id],
	});

	const { user, chats } = useShallowEqualSelector(({ user, chats }) => ({
		user,
		chats,
	}));

	useEffect(() => {
		return () => ClearCurrentConversation();
	}, []);

	useEffect(() => {
		chatListItem.current && chatListItem.current.scrollIntoView({ behavior: 'smooth' });
	}, [chats.chats.length]);

	return (
		<>
			{loading ? <Loading>Loading Chats and User details...</Loading> : ''}
			<ChatLayout userID={user._id} />
			<div id='chat' style={bgStyle}>
				<SecutityMessage />
				<div className='container'>
					{chats.chats.map((chat) => {
						return <TextChat referance={chatListItem} key={chat._id} data={chat} me={user._id} />;
					})}
				</div>

				<AddChat conversation={chats.conversation} user={user} />
			</div>
		</>
	);
};

export default withRouter(Index);
