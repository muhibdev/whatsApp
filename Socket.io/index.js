const { Add_Contact } = require('../DataBaseHandler/contact');
const {
	Find_Conversations_WithDetails,
	Find_Conversation_Data,
	Find_Conversation_Members,
	Find_Conversation_WithDetails,
} = require('../DataBaseHandler/Conversation');
const { Add_Chat, Update_Chat_Status } = require('../DataBaseHandler/Chat');
const User = require('../Models/User');
// const { AddStatus } = require('../dbQuery/Status');

const { CHAT_STATUS_TYPES } = require('../Configration/Types');

module.exports = (io) => {
	io.on('connect', async (socket) => {
		const id = socket.handshake.query._id.toString();
		socket.join(id);
		console.log(`New User Connected with id of ${id}`);

		socket.on('Send Chat', async ({ chat, members, conversationID }) => {
			const caht = await Add_Chat(id, chat);
			members.forEach((ele) => io.in(ele.toString()).emit('Racive Chat', caht));
			const conversation = await Find_Conversation_WithDetails({ _id: conversationID });
			members.forEach((ele) => io.in(ele.toString()).emit('Updata Conversation info', conversation));
		});

		socket.on('Chat Readed', async ({ id, user }) => {
			const chat = await Update_Chat_Status(CHAT_STATUS_TYPES.READ)(id);
			console.log(chat);
			io.in(user.toString()).emit('Chat Status Update', chat);
		});

		socket.on('Add  Contact', async ({ contact }) => {
			io.in(id).emit('Added Contact', await Add_Contact(id, contact));
		});

		socket.on('Get Conversation data', async ({ conversationID }) => {
			io.in(id).emit('Current Conversation Data', await Find_Conversation_Data(conversationID));
		});

		const user = await User.findById(id)
			.select('+contacts')
			.populate('contacts.user');

		socket.emit('Conversations', await Find_Conversations_WithDetails(id));
		socket.emit('Contacts', await user.contacts.map((contact) => contact));

		// const conversations = await FindAllConversationsWithChat(id);
		//
		// // AddStatus();
		// // const contacts = await AddContact(id, '61424ab0b4ae6a1cd4fcd2f9');
		// const contacts = await FindAllContactsWithSatuses(id);
		// socket.emit('contacts', contacts);
		// const calls = await Promise.all(conversations.map(async (conversation) => await FindAllCalls(conversation._id)));
		// socket.emit('calls', calls);
	});
};
