const Call = require('../Models/Call');
const User = require('../Models/User');

const { USER } = require('../Configration/dbCollectionsName');

exports.FindAllCalls = async (_id) => {
	const Call = await Call.find({ conversation: _id });

	return Call;
};
