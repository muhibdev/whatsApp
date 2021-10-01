const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const { app } = require('../Server');

const GlobalErrorHandler = require('../Cantrollers/Error');
const AppError = require('../utils/AppError');

const { API_ROUTES, API_URL } = require('../Configration/defaults');

const User = require('../Routes/User');
const Conversation = require('../Routes/Conversation');
const Contacts = require('../Routes/Contacts');

app.use(xss());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(cors());
app.options('*', cors());
app.use(express.json({ limit: '10000kb' }));
app.use(express.urlencoded({ extended: true, limit: '10000kb' }));
app.use(express.static(path.resolve(__dirname, '../client/build')));

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use('/', express.static('Public/public'));
app.use('/media', express.static('Media'));

/* Routed */
app.use(API_ROUTES.USER, User);
app.use(API_ROUTES.CONVERSATION, Conversation);
app.use(API_ROUTES.CONTACTS, Contacts);

app.all(`${API_URL}`, (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
