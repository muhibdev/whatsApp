const express = require('express');

const port = process.env.PORT || 3001;
const app = express();

const socketio = require('socket.io');

const expressServer = app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

const io = socketio(expressServer, {
	cors: {
		origin: '*',
		methods: '*',
	},
});

module.exports = {
	app,
	io,
};
