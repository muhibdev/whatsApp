const { Find_Conversation_WithDetails } = require('../DataBaseHandler/Conversation');
const { Add_Chat, Update_Chat_Status, Update_Chats_STATUS } = require('../DataBaseHandler/Chat');
const { CHAT_STATUS_TYPES } = require('../Configration/Types');

module.exports = (io, socket, id /* User ID*/) => {
	socket.on('Send Chat', async ({ chat, members, conversationID }) => {
		const tempID = chat.tempID;
		const newChat = await Add_Chat(id, chat);
		members.forEach((ele) => io.in(ele.toString()).emit('Racive Chat', { ...newChat._doc, tempID }));
		const conversation = await Find_Conversation_WithDetails({ _id: conversationID });
		members.forEach((ele) => io.in(ele.toString()).emit('Updata Conversation info', conversation));
	});

	socket.on('Chat Readed', async ({ conversationID, user }) => {
		io.in(user.toString()).emit('Chat Status Read', await Update_Chat_Status(conversationID, CHAT_STATUS_TYPES.READ));
	});
	socket.on('Chat Delivered', async ({ conversationID, user }) => {
		io.in(user.toString()).emit(
			'Chat Status Delivered',
			await Update_Chat_Status(conversationID, CHAT_STATUS_TYPES.DELIVERED)
		);
	});
	socket.on('typing', async ({ users, name }) => {
		users.forEach((ele) => io.in(ele.toString()).emit('typing', { name }));
	});

	socket.on('All Conversation Chat Delivered', async ({ users, conversation }) => {
		const oterUsers = users.find((ele) => ele.toString() !== id);
		await Update_Chats_STATUS(conversation, CHAT_STATUS_TYPES.DELIVERED);
		io.in(oterUsers.toString()).emit('All Chats Delivered', { conversation, status: CHAT_STATUS_TYPES.DELIVERED });
	});
};
