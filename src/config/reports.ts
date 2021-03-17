import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;


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
  config: {
    disk: {},
    aws: {
      bucket: 'triunfo-digital-relatorios',
    },
  },
} as IUploadConfig;
