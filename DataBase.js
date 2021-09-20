const mongoose = require('mongoose');

const DB = process.env.DATABASE_URI.replace('<username>', process.env.DB_USERNAME).replace(
	'<password>',
	process.env.DB_PASSWORD
);

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
};

mongoose.Promise = global.Promise;

mongoose
	.connect(DB, options)
	.then(() => console.log('DB connection successful!'))
	.catch(() => console.log('DB Connection Error'));
