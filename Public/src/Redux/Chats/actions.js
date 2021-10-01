import {
	ADD_CHAT,
	RACIVE_CHAT,
	CHAT_SATUS_READ,
	CHAT_SATUS_DELIVERED,
	SET_CURRENT_CONVERSATION,
	CLEAR_CURRENT_CONVERSATION,
	GET_ALL_CHATS,
	SET_CHAT_LOADING,
} from '../types';

import API, { authHeader } from '../../Api';
import { API_ROUTES } from '../../Configration/APIRoutes';

export const getAllChats = (conversationID) => async (dispatch) => {
	try {
		if (!conversationID) return;
		dispatch(setLoading());
		const { data } = await API.get(`${API_ROUTES.CONVERSATION}/${conversationID}`, authHeader());
		dispatch({
			type: GET_ALL_CHATS,
			payload: data.data,
		});
	} catch (error) {
		throw new Error(error);
	} finally {
		dispatch(setLoading());
	}
};

export const setCurrentConversation = (data) => ({
	type: SET_CURRENT_CONVERSATION,
	payload: data,
});
export const clearCurrentConversation = (data) => ({
	type: CLEAR_CURRENT_CONVERSATION,
	payload: data,
});
export const addChat = (data) => ({
	type: ADD_CHAT,
	payload: data,
});

export const raciveChat = (data) => ({
	type: RACIVE_CHAT,
	payload: data,
});

export const chatStatusRead = (data) => ({
	type: CHAT_SATUS_READ,
	payload: data,
});
export const chatStatusDelivered = (data) => ({
	type: CHAT_SATUS_DELIVERED,
	payload: data,
});

export const setLoading = (loading = true) => ({
	type: SET_CHAT_LOADING,
	payload: loading,
});
