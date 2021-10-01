const Chat = require('./Chat');
const Call = require('./Call');
const Contact = require('./Contact');
const Conversation = require('./Conversation');
const User = require('./User');

module.exports = (io) => {
	io.on('connect', async (socket) => {
		const id = socket.handshake.query._id.toString();
		socket.join(id);
		console.log(`New User Connected with id of ${id}`);

		User(io, socket, id);
		Chat(io, socket, id);
		Call(io, socket, id);
		Contact(io, socket, id);
		Conversation(io, socket, id);
	});
};
