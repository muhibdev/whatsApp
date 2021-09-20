const catchAsync = require('../Utils/CatchAsync');

const { Check_User_Username_Available, Find_User_By_Username } = require('../DataBaseHandler/User/username');

exports.checkUsernameIsAvalibale = catchAsync(async (req, res, next) => {
	const avalable = await Check_User_Username_Available(req.query.username);
	res.status(200).json({
		status: 'success',
		data: {
			avalable,
		},
	});
});

exports.searchUsers = catchAsync(async (req, res, next) => {
	const users = await Find_User_By_Username(req.query.search);
	res.status(200).json({
		status: 'success',
		data: {
			users,
		},
	});
});
