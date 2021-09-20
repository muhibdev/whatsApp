const mongoose = require('mongoose');

const { CONVERSATION, USER, GROUP } = require('../Configration/dbCollectionsName');
const { CONVERSATION_TYPES } = require('../Configration/Types');

const Schema = new mongoose.Schema(
	{
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: USER,
				required: true,
			},
		],
		type: {
			type: String,
			enum: Object.values(CONVERSATION_TYPES),
			default: CONVERSATION_TYPES.PRIVATE,
		},
		GROUP: {
			type: mongoose.Schema.Types.ObjectId,
			ref: GROUP,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model(CONVERSATION, Schema);
