import { SET_USER_LOADING, CREATE_ACCOUNT, LOGIN } from '../types';

const INITIAL_STATE = {
	loading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CREATE_ACCOUNT:
		case LOGIN:
			return {
				...state,
				...action.payload,
				loading: false,
			};
		case SET_USER_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		default:
			return state;
	}
};
export default reducer;
