const Status = require('../Models/Status');
const User = require('../Models/User');

exports.AddStatus = async (id, data) => {
	id = '61424ab0b4ae6a1cd4fcd2f9';
	const status = await Status.create(data);

	await User.findByIdAndUpdate(id, {
		$push: {
			statuses: status._id,
		},
	});

	return status;
};
