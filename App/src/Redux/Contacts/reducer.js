import { SET_CONTACTS_LOADING, ADD_CONTACT, ADD_CONTACTS, GET_ALL_CONTACTS } from '../types';

const INITIAL_STATE = {
	contacts: [],
	loading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.payload],
				loading: false,
			};

		case GET_ALL_CONTACTS:
		case ADD_CONTACTS:
			return {
				...state,
				contacts: action.payload,
				loading: false,
			};
		case SET_CONTACTS_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		default:
			return state;
	}
};
export default reducer;
