const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const AppError = require('../Utils/AppError');
const catchAsync = require('../Utils/CatchAsync');

const User = require('../Models/User');
const Media = require('../Models/Media');

/*  Database hanlders */
const { Create_User } = require('../DataBaseHandler/User');

const { MEDIA_TYPES } = require('../Configration/Types');
const { DEFAULTS_CONTACTS } = require('../Configration/signUpTemplate');

const { DEFAULT_AVATAR_URL } = require('../Configration/defaults');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.SECRET_TOKEN_ACCESS, {
		expiresIn: process.env.EXPIRE_TOKEN_ACCESS,
	});
};

const createSendToken = (user, statusCode, req, res) => {
	const token = signToken(user._id);
	res.cookie('jwt', token, {
		expires: new Date(Date.now() + process.env.EXPIRE_TOKEN_ACCESS * 24 * 60 * 60 * 1000),
		httpOnly: true,
		secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
	});

	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	await User.syncIndexes();

	const newUser = await Create_User({
		...req.body,
		avatar: req.file ? req.file.path.path : DEFAULT_AVATAR_URL,
	});

	// const

	// GenrateBasicUserTemplate(newUser);

	if (req.file) {
		await Media.create({
			user: newUser._id,
			type: MEDIA_TYPES.IMAGE,
			size: req.file.size,
			alt: req.file.originalname.toString().split('.')[0],
			path: req.file.path,
		});
	}

	// await Contacts.create({
	// 	user: newUser._id,
	// 	contacts: DEFAULTS_CONTACTS,
	// });

	newUser.pin = undefined;
	req.user = newUser;
	createSendToken(newUser, 201, req, res);
});

// ------------------
exports.login = catchAsync(async (req, res, next) => {
	const { username, pin } = req.body;
	if (!username || !pin) {
		return next(new AppError('Please provide username and pin!', 400));
	}
	// 2) Check if user exists && pin is correct
	const user = await User.findOne({ username }).select('+pin');

	if (!user) {
		return next(new AppError(`Can't Find user with this username`, 401));
	}
	if (!(await user.checkPin(pin, user.pin))) {
		return next(new AppError('Incorrect pin', 401));
	}
	// 3) If everything ok, send token to client
	createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
	// 1) Getting token and check of it's there
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return next(new AppError('You are not logged in! Please log in to get access.', 401));
	}

	// 2) Verification token
	const decoded = await promisify(jwt.verify)(token, process.env.SECRET_TOKEN_ACCESS);
	// 3) Check if user still exists
	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(new AppError('The user belonging to this token does no longer exist.', 401));
	}

	// GRANT ACCESS TO PROTECTED ROUTE
	req.user = currentUser;
	next();
});

exports.tryLogin = catchAsync(async (req, res, next) => {
	if (!req.user) {
		return next(new AppError('You are not logged in! Please log in to get access.', 401));
	}
	const user = await User.findById(req.user._id);

	createSendToken(user, 201, req, res);
});
