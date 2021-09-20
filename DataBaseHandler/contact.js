const User = require('../Models/User');

const { Find_Conversation_ByMembers, Create_Conversation_Private } = require('./Conversation');

const Find_Contact = async (id) => {
	return await User.findById(id).select(['name', 'avatar', 'about', 'username']);
};

const Find_All_Contacts = async (...ids) => {
	return await User.find({ _id: { $in: ids } }).select(['name', 'avatar', 'about', 'username']);
};

const Add_Contact = async (id, contact) => {
	let coversation = await Find_Conversation_ByMembers(id, contact);
	if (!coversation) {
		coversation = await Create_Conversation_Private(id, contact);
	}
	await Add_Contact_ToList(id, contact, coversation._id);

	const otherUser = coversation.members.find((ele) => ele !== id);
	const newContact = await Find_Contact(otherUser);
	return {
		user: newContact,
		coversation: coversation._id,
	};
};

const Add_Contact_ToList = async (id, contact, ConversationID) => {
	return await User.findByIdAndUpdate(id, {
		$push: {
			contacts: {
				user: contact,
				conversation: ConversationID,
			},
		},
	});
};

module.exports = {
	Add_Contact,
	Find_Contact,
	Find_All_Contacts,
};
