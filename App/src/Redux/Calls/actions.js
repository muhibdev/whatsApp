import { SET_CALLS_LOADING, ADD_CALL_LOG, NEW_CALL, CEAR_CURRENT_CALL, UPDATE_CALL } from '../types';

export const newcall = (call) => (dispatch) => {
	dispatch({
		type: NEW_CALL,
		payload: call,
	});
};
export const updateCall = (data) => (dispatch) => {
	dispatch({
		type: UPDATE_CALL,
		payload: data,
	});
};

export const addCall = (data) => ({
	type: ADD_CALL_LOG,
	payload: data,
});

export const clearCurrent = () => ({
	type: CEAR_CURRENT_CALL,
});

export const setLoading = (loading = true) => ({
	type: SET_CALLS_LOADING,
	payload: loading,
});
