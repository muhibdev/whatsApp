const Call = require('../Models/Call');

const FindAllCalls = async (_id) => {
	const Call = await Call.find({ conversation: _id });
	return Call;
};

const New_Call = async (data) => {
	return await Call.create(data);
};

const updateCallStatus = async (status, id) => {
	return await Call.findByIdAndUpdate(
		id,
		{ status },
		{
			new: true,
		}
	);
};

module.exports = {
	New_Call,
	FindAllCalls,
	updateCallStatus,
};
