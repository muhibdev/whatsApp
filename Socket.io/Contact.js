const { Add_Contact } = require('../DataBaseHandler/contact');
const { Find_Conversation_WithDetails } = require('../DataBaseHandler/Conversation');
const Conversation = require('../Models/Conversation');
const User = require('../Models/User');

module.exports = (io, socket, id /* User ID*/) => {
	socket.on('Add Contact', async ({ contact }) => {
		const newContact = await Add_Contact(id, contact);
		io.in(id).emit('New Contact', newContact);
		/*Add New Conversation Event */
		const conversation = await Conversation.findById(newContact.coversation);
		const conversationDetails = await Find_Conversation_WithDetails(conversation, id);
		io.in(id).emit('New Conversation', conversationDetails);
		const user = await User.findById(id);
		conversationDetails.user = user;

		io.in(newContact.user._id.toString()).emit('New Conversation', conversationDetails);
		/* Add Conversation Request to all members */
	});
};
