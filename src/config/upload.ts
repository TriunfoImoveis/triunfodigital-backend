import dotenv from 'dotenv';
import multer, { Options } from 'multer';
import path from 'path';
import crypto from 'crypto';

dotenv.config();

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;
  MAX_SIZE_TWO_MEGABYTES: number;

  multer: Options;
  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}
export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
    limits: {
      fileSize: MAX_SIZE_TWO_MEGABYTES,
    },
    fileFilter: (req, file, cb) => {
      const allowedMimes = ['image/jpeg', 'image/png'];

      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type.'));
      }
    },
  },
  config: {
    disk: {},
    aws: {
      bucket: 'triunfo-digital',
    },
  },
} as IUploadConfig;
