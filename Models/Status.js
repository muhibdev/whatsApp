const mongoose = require('mongoose');

const { STATUS } = require('../Configration/dbCollectionsName');
const { STATUS_TYPES } = require('../Configration/Types');

const Schema = new mongoose.Schema(
	{
		time: {
			type: Date,
			default: Date.now(),
		},
		type: {
			type: String,
			enum: Object.values(STATUS_TYPES),
			default: STATUS_TYPES.TEXT,
		},
		data: {
			type: Object,
			default: {},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model(STATUS, Schema);
