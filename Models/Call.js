const mongoose = require('mongoose');

const { CALL, CONVERSATION, USER } = require('../Configration/dbCollectionsName');
const { CALL_STATUS_TYPES, CALL_TYPES } = require('../Configration/Types');

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
			enum: Object.values(CALL_TYPES),
			default: CALL_TYPES.AUDIO,
		},
		status: {
			type: String,
			enum: Object.values(CALL_STATUS_TYPES),
			default: CALL_STATUS_TYPES.CONNECTING,
		},
		data: {
			type: Object,
			default: {},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model(CALL, Schema);
