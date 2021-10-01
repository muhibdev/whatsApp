import useFatchAction from '../../Hooks/useFatchAction';
import { useShallowEqualSelector } from '../../Hooks/Redux';

import { getAllConversations } from '../../Redux/Conversation/actions';

import ChatListItem from '../../Components/ChatListItem';
import Loading from '../../Components/Loading';

import './index.scss';

const ChatsList = () => {
	const { conversations, user } = useShallowEqualSelector(({ conversation, user }) => ({
		conversations: conversation.conversations,
		user,
	}));
	const { loading } = useFatchAction(getAllConversations, { isLoading: conversations.length });

	return (
		<>
			{loading ? <Loading /> : ''}
			<ul id='recent-chats'>
				{conversations.length !== 0
					? conversations
							.filter((conversation) => conversation['latest-chat'])
							.map((conversation) => <ChatListItem me={user._id} key={conversation._id} conversation={conversation} />)
					: ''}
			</ul>
		</>
	);
};

export default ChatsList;
