const { MAX_SEARCH_RESULTS } = require('../../Configration/defaults');
const User = require('../../Models/User');

const Find_User_By_Username = async (searchQuery = '') => {
	return await User.find({
		$or: [{ username: { $regex: searchQuery } }, { name: { $regex: searchQuery } }],
	})
		.select(['name', 'avatar', 'about', 'username'])
		.limit(MAX_SEARCH_RESULTS);
};

const Check_User_Username_Available = async (username) => {
	return Boolean([...(await User.find({ username }))].length);
};

module.exports = {
	Find_User_By_Username,
	Check_User_Username_Available,
};
