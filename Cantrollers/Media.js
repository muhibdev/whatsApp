const sharp = require('sharp');
const upload = require('../Multer');
const MEDIA_FOLDER = './Media/users-media';

const resizeImgAndSave = (width = 100, height = 100, qty = 90) => async (req, res, next) => {
	if (!req.file) return next();
	const username = req.user?.username || req.body.username || 'Gust';
	const fileOrignalname = req.file.originalname.toString().split('.')[0];

	const FileName = `${MEDIA_FOLDER}/${username}-${Date.now()}-${fileOrignalname}.jpeg`.replace('./', '/');

	await sharp(req.file.buffer)
		.resize(width, height)
		.toFormat('jpeg')
		.jpeg({ quality: qty })
		.toFile(FileName);

	req.file.path = FileName.replace('./', '/');
	next();
};

exports.uploadProfileImg = [upload.single('avatar'), resizeImgAndSave()];
