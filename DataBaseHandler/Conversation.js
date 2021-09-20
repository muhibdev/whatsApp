const Conversation = require('../Models/Conversation');
const User = require('../Models/User');

const { FIND_LATEST_CHAT, Count_Unread_Chats, Get_All_Chats } = require('./Chat');
// const { FindAllCalls } = require('./Calls');
// const { Find_Contact } = require('./contact');

const Create_Conversation_Private = async (...members) => {
	return await Conversation.create({
		members: members,
	});
};

const Find_Conversation_ByMembers = async (...members) => {
	return await Conversation.findOne({
		members: { $in: members },
	});
};

const Find_Conversations_ByMembers = async (...members) => {
	return await Conversation.find({
		members: { $in: members },
	});
};

const Find_Conversation_ByIds = async (ids) => {
	return await Conversation.find({
		_id: { $in: ids },
	});
};

const Find_Conversations_WithDetails = async (id) => {
	const conversations = await Find_Conversations_ByMembers(id);
	return await Promise.all(conversations.map(async (ele) => await Find_Conversation_WithDetails(ele, id)));
};

const Find_Conversation_WithDetails = async ({ members, type, _id }, id) => {
	const latestchat = await FIND_LATEST_CHAT(_id);
	const unreadChats = await Count_Unread_Chats(_id);
	const user = id && (await User.findById(id).select(['name', 'avatar', 'about', 'username']));
	return {
		type,
		_id,
		user,
		members,
		'latest-chat': latestchat,
		'total-un-read': unreadChats,
	};
};

const Find_Conversation_Data = async (conversationID) => {
	const chats = await Get_All_Chats(conversationID);
	return { chats };
};

const Find_Conversation_Members = async (conversationID) => {
	return await Conversation.findOne({
		_id: conversationID,
	}).select('members');
};

module.exports = {
	Create_Conversation_Private,
	Find_Conversations_ByMembers,
	Find_Conversation_ByMembers,
	Find_Conversation_Data,
	Find_Conversations_WithDetails,
	Find_Conversation_Members,
	Find_Conversation_WithDetails,
};
