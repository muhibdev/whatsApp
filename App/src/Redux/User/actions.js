import { SET_USER_LOADING, CREATE_ACCOUNT, LOGIN } from '../types';

import API, { authHeader, setAuthToken } from '../../Api';
import { API_ROUTES } from '../../Configration/APIRoutes';

import Paths from '../../Configration/Paths';

export const createAccount = (body) => async (dispatch) => {
	try {
		const { data } = await API.post(`${API_ROUTES.USER}/signup`, body, authHeader());

		const payload = {
			toket: data.token,
			...data.data.user,
		};
		setAuthToken(data.token);
		dispatch({
			type: CREATE_ACCOUNT,
			payload,
		});
	} catch (err) {
		throw new Error();
	}
};

export const logIn = (body) => async (dispatch) => {
	try {
		const { data } = await API.post(`${API_ROUTES.USER}/login`, body, authHeader());

		const payload = {
			toket: data.token,
			...data.data.user,
		};

		setAuthToken(data.token);
		dispatch({
			type: LOGIN,
			payload,
		});
	} catch (err) {
		throw new Error();
	}
};

export const tryLogin = () => async (dispatch) => {
	try {
		const { data } = await API.post(`${API_ROUTES.USER}/login/try`, {}, authHeader());

		const payload = {
			toket: data.token,
			...data.data.user,
		};

		setAuthToken(data.token);
		dispatch({
			type: LOGIN,
			payload,
		});
	} catch (err) {
		throw new Error();
	}
};

export const setLoading = (loading = true) => ({
	type: SET_USER_LOADING,
	payload: loading,
});
