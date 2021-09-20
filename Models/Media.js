const mongoose = require('mongoose');

const { MEDIA, CONVERSATION, USER } = require('../Configration/dbCollectionsName');
const { MEDIA_TYPES } = require('../Configration/Types');

const Schema = new mongoose.Schema(
	{
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
			enum: Object.values(MEDIA_TYPES),
			default: MEDIA_TYPES.IMG,
		},
		path: {
			type: String,
		},
		size: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model(MEDIA, Schema);
