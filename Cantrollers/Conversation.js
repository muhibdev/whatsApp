const AppError = require('../utils/AppError');
const catchAsync = require('../Utils/CatchAsync');

const { Find_Conversations_WithDetails, Find_Conversation_Data } = require('../DataBaseHandler/Conversation');

exports.getAll = catchAsync(async (req, res, next) => {
	let doc = await Find_Conversations_WithDetails(req.user._id);

	res.status(200).json({
		status: 'success',
		doc,
	});
});

exports.getOne = catchAsync(async (req, res, next) => {
	let data = await Find_Conversation_Data(req.params.id, req.user._id);

	if (!data) {
		return next(new AppError('No document found with that ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data,
	});
});
