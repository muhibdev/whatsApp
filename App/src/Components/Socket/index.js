/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect, useCallback } from 'react';
import io from 'socket.io-client';

import { tryLogin } from '../../Redux/User/actions';
import { addContact } from '../../Redux/Contacts/actions';
import { updateConversations, addConversation } from '../../Redux/Conversation/actions';
import { chatStatusRead, chatStatusDelivered, raciveChat } from '../../Redux/Chats/actions';
import { newcall, updateCall } from '../../Redux/Calls/actions';

import Paths from '../../Configration/Paths';
import { useActions, useShallowEqualSelector } from '../../Hooks/Redux';

const Index = ({ children, history }) => {
	/* Coversations */
	const [UpdateConversations, AddConversation] = useActions([updateConversations, addConversation]);

	/* Call */
	const [Newcall, UpdateCall] = useActions([newcall, updateCall]);

	/* Chats */
	const [ChatStatusRead, ChatStatusDelivered, RaciveChat] = useActions([
		chatStatusRead,
		chatStatusDelivered,
		raciveChat,
	]);

	/* Contacts */
	const [AddContact] = useActions([addContact]);

	/*  Users */
	const [TryLogin] = useActions([tryLogin]);

	const { user, calls } = useShallowEqualSelector(({ user, calls }) => ({ user, calls }));

	/* socket Functions */

	const conversations = useCallback((socket) => {
		socket.on('New Conversation', AddConversation);
	}, []);
	const contacts = useCallback((socket) => {
		socket.on('New Contact', AddContact);
	}, []);
	const chats = useCallback((socket) => {
		socket.on('Racive Chat', (newChat) => {
			RaciveChat(newChat);
			UpdateConversations(newChat);

			if (newChat.user !== user._id) {
				socket.emit('Chat Delivired', {
					conversationID: newChat.conversation,
					user: newChat.user,
				});
			}
		});

		// socket.on('typing', (user) => {
		// 	console.log('user typing');
		// });
		socket.on('Chat Status Read', ChatStatusRead);
		socket.on('Chat Status Delivered', ChatStatusDelivered);
	}, []);

	const call = useCallback((socket) => {
		/* Raciver listner */
		socket.on('New Call Request', (call) => {
			if (window.onCall) {
				return socket.emit('Bussey On Call', call);
			}
			Newcall(call);
		});

		/* Sender Listner */
		socket.on('Call Connected', (call) => {
			if (!window.onCall || calls.current?._id) return;
			Newcall(call);
		});
		socket.on('Call Status Ringing', (call) => {
			if (!window.onCall) return;
			UpdateCall(call);
		});
	}, []);
	/* Socket Connection */
	useEffect(() => {
		(async () => {
			try {
				await TryLogin();
				if (!user._id) return;
				const socket = io('http://localhost:3001', {
					query: {
						_id: user._id,
					},
				});

				window.socket = socket;
				chats(socket);
				call(socket);
				contacts(socket);
				conversations(socket);
			} catch (error) {
				console.log(error);
				const { pathname } = window.location;
				if (pathname === Paths.LogIn || pathname === Paths.SignUp) return;
				window.location.href = Paths.LogIn;
			}
		})();
		return () => window.socket && window.socket.disconnect();
	}, [user._id]);

	return children;
};
export default Index;
