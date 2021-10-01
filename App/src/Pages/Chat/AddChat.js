/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { encryptData } from '../../Utils/Crypto';
import { ChatsState } from '../../Configration/States';
import { addChat } from '../../Redux/Chats/actions';
import { useActions } from '../../Hooks/Redux';

import BackgroundImg from './img/bg-chat-tile-dark.png';
const bgStyle = { backgroundImage: `url('${BackgroundImg}')` };

const AddChat = ({ user, conversation }) => {
	const AddChat = useActions(addChat);
	const inputRef = useRef();

	useEffect(() => {
		if (!inputRef.current) return;
		inputRef.current.focus();
	}, [inputRef.current]);

	const sendChat = async (e) => {
		e.preventDefault();
		const { value } = inputRef.current;
		if (!value) return;

		const chat = {
			time: Date.now(),
			conversation: conversation._id,
			tempID: uuidV4(),
			data: {
				text: encryptData(value),
			},
		};

		await AddChat({
			...chat,
			_id: chat.time,
			status: ChatsState.SENDING,
			user: user._id,
		});
		inputRef.current.focus();

		(await window.socket) &&
			window.socket.emit('Send Chat', {
				chat,
				members: conversation.members.map((m) => m._id),
				conversationID: conversation._id,
			});
		// inputRef.current.value = '';
	};
	return (
		<form onSubmit={sendChat} className='footer' style={bgStyle}>
			<div className='input-container'>
				<div className='emoji'>
					<svg width='24' height='24'>
						<path
							fill='currentColor'
							d='M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z'
						/>
					</svg>
				</div>
				<input ref={inputRef} type='text' />
				<div className='attachment'>
					<svg width='24' height='24'>
						<path
							fill='currentColor'
							d='M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 003.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 01-2.829 1.171 3.975 3.975 0 01-2.83-1.173 3.973 3.973 0 01-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 00-.834.018l-7.205 7.207a5.577 5.577 0 00-1.645 3.971z'
						/>
					</svg>
				</div>
				<div className='camera'>
					<svg width='24' height='24' viewBox='0 0 471.04 471.04'>
						<path
							fill='currentColor'
							d='M414.72 112.64h-49.152l-27.136-40.96c-10.24-15.36-28.16-24.576-46.592-24.576H179.2c-18.432 0-36.352 9.216-46.592 24.576l-27.136 40.96H56.32A56.158 56.158 0 000 168.96v198.656a56.158 56.158 0 0056.32 56.32h358.4a56.158 56.158 0 0056.32-56.32V168.96a56.158 56.158 0 00-56.32-56.32zm-179.2 265.216c-70.144 0-126.976-56.832-126.976-126.976s56.832-126.464 126.976-126.464 126.976 56.832 126.976 126.976c0 69.632-56.832 126.464-126.976 126.464zM407.552 192h-22.528c-9.216-.512-16.384-8.192-15.872-17.408.512-8.704 7.168-15.36 15.872-15.872h20.48c9.216-.512 16.896 6.656 17.408 15.872.512 9.216-6.144 16.896-15.36 17.408z'></path>
						<path
							fill='currentColor'
							d='M235.52 180.736c-38.912 0-70.656 31.744-70.656 70.656s31.744 70.144 70.656 70.144 70.656-31.744 70.656-70.656c0-38.912-31.744-70.144-70.656-70.144z'></path>
					</svg>
				</div>
			</div>
			<div onClick={sendChat} className='mic'>
				<svg width='24' height='24'>
					<path
						fill='currentColor'
						d='M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z'
					/>
				</svg>
			</div>
		</form>
	);
};
export default AddChat;
