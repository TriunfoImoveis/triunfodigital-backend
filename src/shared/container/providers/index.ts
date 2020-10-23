import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/Implementations/DiskStorageProvider';
import S3StorageProvider from './StorageProvider/Implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

switch (uploadConfig.driver) {
  case 's3': {
    container.registerSingleton<IStorageProvider>(
      'StorageProvider',
      providers.s3,
    );
    break;
  }
  case 'disk': {
    container.registerSingleton<IStorageProvider>(
      'StorageProvider',
      providers.disk,
    );
    break;
  }
  default: {
    break;
  }
}
