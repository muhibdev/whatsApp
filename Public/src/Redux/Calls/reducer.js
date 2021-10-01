import { SET_CALLS_LOADING, ADD_CALL_LOG, NEW_CALL, CEAR_CURRENT_CALL, UPDATE_CALL } from '../types';

const INITIAL_STATE = {
	calls: [],
	current: {},
	loading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case NEW_CALL:
			return {
				...state,
				current: action.payload,
				loading: false,
			};
		case UPDATE_CALL:
			return {
				...state,
				current: { ...state.current, ...action.payload, user: state.current.user },
				loading: false,
			};
		case ADD_CALL_LOG:
			return {
				...state,
				calls: [...state.calls, ...action.payload],
				loading: false,
			};
		case CEAR_CURRENT_CALL:
			return {
				...state,
				current: {},
				loading: false,
			};
		case SET_CALLS_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		default:
			return state;
	}
};
export default reducer;
