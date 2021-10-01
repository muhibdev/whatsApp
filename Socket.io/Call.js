const User = require('../Models/User');
const Conversation = require('../Models/Conversation');
const { New_Call, updateCallStatus } = require('../DataBaseHandler/Calls');

const { CALL_STATUS_TYPES, CALL_TYPES } = require('../Configration/Types');

module.exports = (io, socket, id /* User ID*/) => {
	try {
		/*  Sender emmit */
		socket.on('Send Call Request', async ({ user, conversation, members, type, signal }) => {
			user = await User.findById(user);
			let call = await New_Call({ conversation, user, type, status: CALL_STATUS_TYPES.CALLING });
			call = JSON.parse(JSON.stringify(call));
			call = { ...call, signal };
			await members.forEach((ele) => io.in(ele.toString()).emit('New Call Request', call));
			// io.in(user._id.toString()).emit('Call Connected', call);
		});

		// /*  Raciver emit */
		socket.on('Call Ringing', async ({ call }) => {
			call = await updateCallStatus(CALL_STATUS_TYPES.RINGING, call);
			await io.in(call?.user?.toString()).emit('Call Status Ringing', call);
		});
		socket.on('Bussey On Call', async (call) => {
			io.in(call.user._id.toString()).emit('Bussey On Call', call);
		});
		socket.on('Call Request Accepted', async ({ call, signal }) => {
			io.in(call.user._id.toString()).emit('Call Request Accepted', { call: call._id, signal });
		});

		/* For Both users */
		socket.on('Call Ended', async (call) => {
			console.log(call);
			// emit('Call Accepted');
		});
	} catch (error) {
		console.log(error);
	}
};
