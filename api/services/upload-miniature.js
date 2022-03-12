const path = require('path');
const multer = require('multer');

const uploadFilePath = 'public/images';

const storageFile = multer.diskStorage({
  destination: uploadFilePath,
  filename(req, file, cb) {
    cb(null, `${new Date().getTime().toString()}-${file.fieldname}${path.extname(file.originalname)}`);
  },
});

exports.uploadFile = multer({
  storage: storageFile,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const extension = ['.png', '.jpg', '.jpeg'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType = ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) >= 0;
    if (extension && mimeType) {
      return callback(null, true);
    }
    callback(new Error('Invalid file type. Only picture file on type PNG and JPG are allowed!'));
  },
}).single('miniature');