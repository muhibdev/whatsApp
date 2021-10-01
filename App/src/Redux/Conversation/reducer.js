import { SET_CONVERSATIONS_LOADING, ADD_CONVERSATION, ADD_CONVERSATIONS, UPDATE_CONVERSATION } from '../types';

const INITIAL_STATE = {
	conversations: [],
	loading: true,
};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_CONVERSATIONS:
			return {
				...state,
				conversations: action.payload,
				loading: false,
			};
		case ADD_CONVERSATION:
			return {
				...state,
				conversations: [...state.conversations, action.payload],
				loading: false,
			};
		case UPDATE_CONVERSATION:
			return {
				...state,
				conversations: state.conversations.map((ele) => {
					if (ele._id === action.payload.conversation) {
						return {
							...ele,
							'total-un-read': ele['total-un-read'] + 1,
							'latest-chat': action.payload,
						};
					}
					return ele;
				}),
				loading: false,
			};

		case SET_CONVERSATIONS_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		default:
			return state;
	}
};
export default reducer;
