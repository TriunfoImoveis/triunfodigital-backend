import { container } from 'tsyringe';

import uploadConfig from '@config/upload';
import reportConfig from '@config/reports';
import mailConfig from '@config/mail';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/Implementations/DiskStorageProvider';
import S3StorageProvider from './StorageProvider/Implementations/S3StorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';

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
switch (reportConfig.driver) {
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
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider),
);
