const express = require('express');

const { getAll, getOne } = require('../Cantrollers/Conversation');

const { protect } = require('../Cantrollers/Auth');
const router = express.Router();

router.use(protect);
router.route('/').get(getAll);
router.route('/:id').get(getOne);

module.exports = router;
