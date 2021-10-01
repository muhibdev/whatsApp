const mongoose = require('mongoose');

const { CHAT, CONVERSATION, USER } = require('../Configration/dbCollectionsName');
const { CHAT_TYPES, CHAT_STATUS_TYPES } = require('../Configration/Types');

const Schema = new mongoose.Schema(
	{
		conversation: {
			type: mongoose.Schema.Types.ObjectId,
			ref: CONVERSATION,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: USER,
		},

		time: {
			type: Date,
			default: Date.now(),
		},
		type: {
			type: String,
			enum: Object.values(CHAT_TYPES),
			default: CHAT_TYPES.TEXT,
		},
		status: {
			type: String,
			enum: Object.values(CHAT_STATUS_TYPES),
			default: CHAT_STATUS_TYPES.PENDING,
		},
		data: {
			type: Object,
			default: {},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model(CHAT, Schema);
