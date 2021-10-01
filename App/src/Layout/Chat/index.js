import { Link } from 'react-router-dom';
import { useShallowEqualSelector } from '../../Hooks/Redux';
import { MEDIA_HONST } from '../../Configration/defaults';

import UserStatusDate from '../../Components/ChatUserStatusDate';

import Paths from '../../Configration/Paths';
import { CallTypes } from '../../Configration/States';

import './index.scss';

const Index = ({ userID }) => {
	const { conversation } = useShallowEqualSelector(({ chats }) => ({ conversation: chats.conversation }));
	const user = conversation?.members?.find(({ _id }) => _id !== userID);

	if (!conversation.members) return null;
	if (!user) return null;
	return (
		<header className='chat-header'>
			<Link to={Paths.ChatsList} className='back-btn'>
				<svg width='24' height='24' fill='currentColor' viewBox='0 0 447.243 447.243'>
					<path d='M420.361 192.229a31.967 31.967 0 00-5.535-.41H99.305l6.88-3.2a63.998 63.998 0 0018.08-12.8l88.48-88.48c11.653-11.124 13.611-29.019 4.64-42.4-10.441-14.259-30.464-17.355-44.724-6.914a32.018 32.018 0 00-3.276 2.754l-160 160c-12.504 12.49-12.515 32.751-.025 45.255l.025.025 160 160c12.514 12.479 32.775 12.451 45.255-.063a32.084 32.084 0 002.745-3.137c8.971-13.381 7.013-31.276-4.64-42.4l-88.32-88.64a64.002 64.002 0 00-16-11.68l-9.6-4.32h314.24c16.347.607 30.689-10.812 33.76-26.88 2.829-17.445-9.019-33.88-26.464-36.71z' />
				</svg>
			</Link>
			<Link to={`${Paths.Chat}/${conversation._id}${Paths.ConversationDetails}`} className='profile-img'>
				<img src={`${MEDIA_HONST}${user.avatar}`} alt='' className='user_profile'></img>
			</Link>
			<Link to={`${Paths.Chat}/${conversation._id}${Paths.ConversationDetails}`} className='title'>
				<h1 className='title-main'>{user.name}</h1>
				<p className='title-sub'>
					<UserStatusDate userID={user._id} />
				</p>
			</Link>
			<Link
				to={`${Paths.Chat}/${conversation._id}${Paths.Call}?type=${CallTypes.Video}&receiver=fase`}
				className='video-call-btn'
				width='24'
				height='24'>
				<svg fill='currentColor' viewBox='0 0 30 30'>
					<path d='M19 24H2a2 2 0 01-2-2V8a2 2 0 012-2h17a2 2 0 012 2v14a2 2 0 01-2 2zM23 15h7V9l-1.661-.75L23 13z' />
					<circle cx='29' cy='9' r='1' />
					<path d='M23 15h7v6l-1.661.75L23 17z' />
					<circle cx='29' cy='21' r='1' />
				</svg>
			</Link>
			<Link
				to={`${Paths.Chat}/${conversation._id}${Paths.Call}?type=${CallTypes.Audio}&receiver=false`}
				className='voice-call-btn'>
				<svg width='24' height='24' fill='currentColor' viewBox='0 0 405.333 405.333'>
					<path d='M373.333 266.88c-25.003 0-49.493-3.904-72.704-11.563-11.328-3.904-24.192-.896-31.637 6.699l-46.016 34.752c-52.8-28.181-86.592-61.952-114.389-114.368l33.813-44.928c8.512-8.512 11.563-20.971 7.915-32.64-7.723-23.36-11.648-47.872-11.648-72.832 0-17.643-14.357-32-32-32H32C14.357 0 0 14.357 0 32c0 205.845 167.488 373.333 373.333 373.333 17.643 0 32-14.357 32-32V298.88c0-17.643-14.357-32-32-32z'></path>
				</svg>
			</Link>
			<Link to='/' className='more-setting-btn'>
				<svg width='24' height='24'>
					<path
						fill='currentColor'
						d='M12 7a2 2 0 10-.001-4.001A2 2 0 0012 7zm0 2a2 2 0 10-.001 3.999A2 2 0 0012 9zm0 6a2 2 0 10-.001 3.999A2 2 0 0012 15z'
					/>
				</svg>
			</Link>
		</header>
	);
};

export default Index;
