const User = require('../../Models/User');

const Create_User = async (data) => {
	return await User.create(data);
};

const Find_Users = async (...ids) => {
	return await User.find({
		_id: {
			$in: ids,
		},
	});
};

const Update_User_Stateus = async (id, status) => {
	return await User.findByIdAndUpdate(id, {
		status,
	});
};

const Find_User = async (id) => {
	return await User.findById(id);
};

module.exports = {
	Create_User,
	Find_User,
	Find_Users,
	Update_User_Stateus,
};
