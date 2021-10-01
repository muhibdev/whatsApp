import { SET_CONTACTS_LOADING, ADD_CONTACT, ADD_CONTACTS, GET_ALL_CONTACTS } from '../types';

import API, { authHeader } from '../../Api';
import { API_ROUTES } from '../../Configration/APIRoutes';

export const getAllContacts = () => async (dispatch) => {
	try {
		dispatch(setLoading());
		const { data } = await API.get(API_ROUTES.CONTACTS, authHeader());
		dispatch({
			type: GET_ALL_CONTACTS,
			payload: data.data.contacts,
		});
	} catch (error) {
		throw new Error(error);
	} finally {
		dispatch(setLoading());
	}
};
export const addContact = (data) => ({
	type: ADD_CONTACT,
	payload: data,
});
export const addContacts = (data) => ({
	type: ADD_CONTACTS,
	payload: data,
});

export const setLoading = (loading = true) => ({
	type: SET_CONTACTS_LOADING,
	payload: loading,
});
