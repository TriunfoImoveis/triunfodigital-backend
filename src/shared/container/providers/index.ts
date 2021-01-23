import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/Implementations/DiskStorageProvider';
import S3StorageProvider from './StorageProvider/Implementations/S3StorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

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

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
