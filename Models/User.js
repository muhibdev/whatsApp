const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { USER, STATUS } = require('../Configration/dbCollectionsName');
const { DEFAULT_ABOUT_INFO_USER, DEFAULT_AVATAR_URL } = require('../Configration/defaults');

const Schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			index: { unique: true, dropDups: true },
		},
		avatar: {
			type: String,
			default: DEFAULT_AVATAR_URL,
		},
		about: {
			type: String,
			default: DEFAULT_ABOUT_INFO_USER,
		},
		pin: {
			type: String,
			required: true,
			select: false,
		},
		contacts: {
			type: [
				{
					user: {
						type: mongoose.Schema.Types.ObjectId,
						required: true,
					},
					conversation: {
						type: mongoose.Schema.Types.ObjectId,
						required: true,
					},
				},
			],
			select: false,
		},
		status: {
			type: Date,
			default: Date.now(),
		},
		statuses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: STATUS,
			},
		],
	},
	{ timestamps: true }
);

Schema.pre('save', async function(next) {
	if (!this.isModified('pin')) return next();
	this.pin = await bcrypt.hash(this.pin, 12);
	next();
});

Schema.methods.checkPin = async function(candidatePassword, userPassword) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model(USER, Schema);
