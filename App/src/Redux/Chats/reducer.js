import {
	ADD_CHAT,
	RACIVE_CHAT,
	CHAT_SATUS_READ,
	CHAT_SATUS_DELIVERED,
	SET_CURRENT_CONVERSATION,
	CLEAR_CURRENT_CONVERSATION,
	GET_ALL_CHATS,
} from '../types';

import { ChatsState } from '../../Configration/States';

const INITIAL_STATE = {
	conversation: {},
	loading: false,
	chats: [],
};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_CHAT:
			return {
				...state,
				chats: [...state.chats, action.payload],
				loading: false,
			};
		case GET_ALL_CHATS:
			return {
				...state,
				...action.payload,
				loading: false,
			};
		case RACIVE_CHAT:
			if (action.payload.conversation !== state.conversation._id) return state;
			else if (state.chats.some((el) => el.tempID === action.payload.tempID)) {
				return {
					...state,
					chats: state.chats.map((chat) => {
						if (chat.tempID === action.payload.tempID) {
							return { ...chat, ...action.payload };
						}
						return chat;
					}),
					loading: false,
				};
			}
			return {
				...state,
				chats: [...state.chats, action.payload],
				loading: false,
			};
		case CHAT_SATUS_DELIVERED:
			return {
				...state,
				chats: state.chats.map((chat) => {
					if (chat.id === action.payload.id && [ChatsState.PENDING, ChatsState.SENDING].includes(chat.status)) {
						return { ...chat, status: ChatsState.DELIVERED };
					}
					return chat;
				}),
				loading: false,
			};
		case CHAT_SATUS_READ:
			return {
				...state,
				chats: state.chats.map((chat) => {
					if (chat.id === action.payload.id) {
						return { ...chat, status: ChatsState.READ };
					}
					return chat;
				}),
				loading: false,
			};
		case SET_CURRENT_CONVERSATION:
			return {
				...state,
				...action.payload,
				loading: false,
			};
		case CLEAR_CURRENT_CONVERSATION:
			return {
				...state,
				conversation: {},
				chats: [],
				loading: false,
			};
		default:
			return state;
	}
};
export default reducer;
