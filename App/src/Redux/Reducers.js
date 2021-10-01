import { combineReducers } from 'redux';

import User from './User/reducer';
import Conversation from './Conversation/reducer';
import Chats from './Chats/reducer';
import Calls from './Calls/reducer';
import Contacts from './Contacts/reducer';

const reducers = combineReducers({
	user: User,
	conversation: Conversation,
	calls: Calls,
	chats: Chats,
	contacts: Contacts,
});

export default reducers;
