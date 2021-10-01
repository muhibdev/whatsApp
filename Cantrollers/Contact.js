const AppError = require('../Utils/AppError');
const catchAsync = require('../Utils/CatchAsync');

const { Find_All_Contacts, Find_All_Contacts_By_User } = require('../DataBaseHandler/contact');

exports.getAll = catchAsync(async (req, res, next) => {
	let data = await Find_All_Contacts_By_User(req.user._id);

	res.status(200).json({
		status: 'success',
		data,
	});
});

// exports.getOne = catchAsync(async (req, res, next) => {
// 	let data = await Find_Conversation_Data(req.params.id, req.user._id);

// 	if (!data) {
// 		return next(new AppError('No document found with that ID', 404));
// 	}

// 	res.status(200).json({
// 		status: 'success',
// 		data,
// 	});
// });
