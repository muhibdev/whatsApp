const { Update_User_Stateus } = require('../DataBaseHandler/User');
const { ONLINE_STATUS, OFFLINE_STATUS } = require('../Configration/defaults');

module.exports = (io, socket, id /* User ID*/) => {
	socket.on('disconnect', async () => {
		await Update_User_Stateus(id, OFFLINE_STATUS());
	});
	(async () => {
		await Update_User_Stateus(id, ONLINE_STATUS());
	})();
};
