import {
	ADD_CONVERSATION,
	ADD_CONVERSATIONS,
	SET_CONVERSATIONS_LOADING,
	FIND_CONVERSATION,
	SET_CURRENT_CONVERSATION,
	ADD_NEW_CHAT,
	UPDATE_CONVERSATION,
	UPDATE_OR_ADD_NEW_CHAT,
	UPDATE_CHAT_STATUS_CONVERSATION,
	UPDATE_ALL_CHATS_STATUS,
} from '../types';

import API, { authHeader } from '../../Api';
import { API_ROUTES } from '../../Configration/APIRoutes';

export const getAllConversations = () => async (dispatch) => {
	try {
		dispatch(setLoading());
		const { data } = await API.get(API_ROUTES.CONVERSATION, authHeader());
		dispatch({
			type: ADD_CONVERSATIONS,
			payload: data.doc,
		});
	} catch (error) {
		throw new Error(error);
	} finally {
		dispatch(setLoading());
	}
};

export const addConversation = (data) => ({
	type: ADD_CONVERSATION,
	payload: data,
});

export const findConversations = (data) => ({
	type: FIND_CONVERSATION,
	payload: data,
});

export const updateConversations = (data) => ({
	type: UPDATE_CONVERSATION,
	payload: data,
});
export const updateChatStatusConversations = (data) => ({
	type: UPDATE_CHAT_STATUS_CONVERSATION,
	payload: data,
});
export const updateAllChatsStatus = (data) => ({
	type: UPDATE_ALL_CHATS_STATUS,
	payload: data,
});

//

export const setCurrentConversation = (data) => ({
	type: SET_CURRENT_CONVERSATION,
	payload: data,
});

export const addChat = (data) => ({
	type: ADD_NEW_CHAT,
	payload: data,
});

export const updateOrAddNewChat = (data) => ({
	type: UPDATE_OR_ADD_NEW_CHAT,
	payload: data,
});

export const clearCurrentConversation = (data) => ({
	type: FIND_CONVERSATION,
	payload: data,
});

export const setLoading = (loading = true) => ({
	type: SET_CONVERSATIONS_LOADING,
	payload: loading,
});
