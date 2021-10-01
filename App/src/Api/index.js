import axios from 'axios';

import { API_URL, TOKEN_KEY } from '../Configration/APIRoutes';

export const authHeader = () => ({
	headers: {
		Authorization: `Bearer ${getAuthToken()}`,
	},
});

export const setAuthToken = (token) => sessionStorage.setItem(TOKEN_KEY, token);
export const removeAuthToken = () => sessionStorage.removeItem(TOKEN_KEY);
export const getAuthToken = () => sessionStorage.getItem(TOKEN_KEY);

export default axios.create({
	baseURL: API_URL,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': 'true',
	},
});
