import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import crypto from 'crypto';

// Inicialize o cliente S3 com as credenciais e região corretas
const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION // Use 'region' em vez de 'Bucket'
});

const upload = multer({
  storage: multerS3({
    s3: S3,
    bucket: 'quimicainbox', // Certifique-se de que o nome do bucket está correto
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const filename = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, filename);
      });
    }
  })
});

const storage = upload.storage;

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/pjpeg'];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type.'));
  }
};

// Use 'export' em vez de 'module.exports'
export { storage, fileFilter };

export default upload;