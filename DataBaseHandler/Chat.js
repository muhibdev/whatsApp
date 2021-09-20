const Chat = require('../Models/Chat');

const { CHAT_STATUS_TYPES } = require('../Configration/Types');

const FIND_LATEST_CHAT = async (conversationID) => {
	return (
		await Chat.find({ conversation: conversationID })
			.sort({ _id: -1 })
			.limit(1)
	)[0];
};
const Count_Unread_Chats = async (conversationID) => {
	return await Chat.countDocuments({
		conversation: conversationID,
		status: { $in: [CHAT_STATUS_TYPES.DELIVERED, CHAT_STATUS_TYPES.PENDING] },
	});
};

const Get_All_Chats = async (conversationID) => {
	return await Chat.find({ conversation: conversationID }, {}, { sort: { created_at: -1 } });
};

const Add_Chat = async (userID, data) => {
	return await Chat.create({
		user: userID,
		...data,
	});
};

const Update_Chat_Status = (status) => async (id) => {
	return await Chat.findByIdAndUpdate(id, {
		status: status,
	}).select('status');
};

module.exports = {
	FIND_LATEST_CHAT,
	Get_All_Chats,
	Count_Unread_Chats,
	Add_Chat,
	Update_Chat_Status,
};
