const express = require('express');

const { login, protect, signup, tryLogin } = require('../Cantrollers/Auth');
const { checkUsernameIsAvalibale, searchUsers, getUserStatus } = require('../Cantrollers/User');

const { uploadProfileImg } = require('../Cantrollers/Media');
const router = express.Router();

router.route('/find').get(searchUsers);
router.route('/available').get(checkUsernameIsAvalibale);

router.route('/status/:id').get(getUserStatus);

router.route('/signup').post(...uploadProfileImg, signup);
router.route('/login').post(login);

router.use(protect);
router.route('/login/try').post(tryLogin);

module.exports = router;
