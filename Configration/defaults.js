const DEFAULT_AVATAR_URL = '/Media/whatsapp/default-img.png';
const DEFAULT_ABOUT_INFO_USER = 'Hey there! i am using WhatsApp';
const DEFAULT_ABOUT_INFO_GROUP = 'Hey there! its whatsapp group';
const DEFAULT_CHAT_BACKGROUND = 'dsd';

const MAX_SEARCH_RESULTS = 10;
const API_URL = '/api';

const API_ROUTES = {
	USER: `${API_URL}/user`,
	CONVERSATION: `${API_URL}/conversation`,
	CALL: `${API_URL}/call`,
	CHAT: `${API_URL}/chat`,
	STATUS: `${API_URL}/status`,
	CONTACTS: `${API_URL}/contacts`,
	GROUP: `${API_URL}/group`,
	MEDIA: `${API_URL}/media`,
	USER_SETTING: `${API_URL}/user-setting`,
};

module.exports = {
	API_URL,
	API_ROUTES,
	DEFAULT_AVATAR_URL,
	DEFAULT_ABOUT_INFO_USER,
	DEFAULT_ABOUT_INFO_GROUP,
	DEFAULT_CHAT_BACKGROUND,
	MAX_SEARCH_RESULTS,
};
