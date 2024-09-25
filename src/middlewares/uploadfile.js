const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storageImgUser = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'users',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
  }
});

const storageImgEvent = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'events',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
  }
});

const uploadFileUser = multer({ storage: storageImgUser });
const uploadFileEvent = multer({ storage: storageImgEvent });

module.exports = { uploadFileUser, uploadFileEvent };
