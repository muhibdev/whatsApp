const CHAT_TYPES = {
	TEXT: 'text',
	IMAGE: 'image',
	AUDIO: 'audio',
	VIDEO: 'video',
	FILE: 'file',
	VOICE: 'voice',
};

const CHAT_STATUS_TYPES = {
	PENDING: 'pending',
	DELIVERED: 'delivered',
	READ: 'read',
	CONNECTIONG: 'connecting',
};

//
//
//
const CONVERSATION_TYPES = {
	PRIVATE: 'private',
	GROUP: 'group',
};

//
//
//
const CALL_TYPES = {
	AUDIO: 'audio',
	VIDEO: 'video',
};

const CALL_STATUS_TYPES = {
	CONNECTING: 'Connecting',
	CALLING: 'calling',
	RINGING: 'ringing',
	DISCONNECTED: 'disconnected',
	ACCEPTED: 'accepted',
};

//
//
//
const STATUS_TYPES = {
	VIDEO: 'video',
	TEXT: 'text',
	IMG: 'img',
};

//
//
//
const MEDIA_TYPES = {
	VIDEO: 'video',
	IMG: 'img',
	AUDIO: 'audio',
};

module.exports = {
	CHAT_TYPES,
	CHAT_STATUS_TYPES,
	CONVERSATION_TYPES,
	CALL_TYPES,
	CALL_STATUS_TYPES,
	STATUS_TYPES,
	MEDIA_TYPES,
};
