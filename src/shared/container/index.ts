import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IOfficeRepository from '@modules/organizations/repositories/IOfficeRepository';
import OfficeRepository from '@modules/organizations/infra/typeorm/repositories/OfficesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IOfficeRepository>(
  'OfficesRepository',
  OfficeRepository,
);
