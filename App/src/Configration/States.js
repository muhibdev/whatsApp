/*  Chats */
export const ChatsState = {
	PENDING: 'pending',
	DELIVERED: 'delivered',
	READ: 'read',
	SENDING: 'sending',
};

export const ChatType = {
	Text: 'text',
	Image: 'image',
	Video: 'video',
	Audio: 'audio',
	File: 'file',
	Location: 'location',
	Contact: 'contact',
	Sticker: 'sticker',
	Gif: 'gif',
	Voice: 'voice',
	Document: 'document',
};

export const ChatDirections = {
	In: 'in',
	Out: 'out',
};

/* calls */
export const CallsState = {
	Connecting: 'connecting',
	Calling: 'calling',
	Ringing: 'ringing',
	Disconnected: 'disconnected',
	Accepted: 'accepted',
	Bussay: 'bussay on other call',
};

export const CallTypes = {
	Audio: 'audio',
	Video: 'video',
};

export const CallDirections = {
	Outgoing: 'outgoing',
	Incoming: 'incoming',
};

export const CallsErrors = {
	Busy: 'busy',
	Declined: 'declined',
	Missed: 'missed',
	NoAnswer: 'no-answer',
	Canceled: 'canceled',
	Failed: 'failed',
	NotFound: 'not-found',
	NotAllowed: 'not-allowed',
	NotSupported: 'not-supported',
	Timeout: 'timeout',
	Unknown: 'unknown',
};

/* Users */

export const UserStatus = {
	Online: 'online',
	Offline: 'offline',
	Away: 'away',
	Busy: 'busy',
	Invisible: 'invisible',
	DoNotDisturb: 'do-not-disturb',
	LastSeen: 'last-seen',
	LastSeenAt: 'last-seen-at',
	OfflineFor: 'offline-for',
	OfflineUntil: 'offline-until',
	OnlineFor: 'online-for',
	OnlineUntil: 'online-until',
	Typing: 'typing',
};
