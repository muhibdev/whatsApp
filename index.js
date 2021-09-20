const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const { app, io } = require('./Server');
require('./DataBase');
require('./Socket.io')(io);
require('./Express');

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

process.on('unhandledRejection', (err) => {
	console.log(err);
	console.log('UNHANDLED REJECTION! 💥 Shutting down...');
	console.log(err.name, err.message);
	// app.close(() => {
	process.exit(1);
	// });
});

process.on('SIGTERM', () => {
	console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
	// app.close(() => {
	console.log('💥 Process terminated!');
	// });
});
