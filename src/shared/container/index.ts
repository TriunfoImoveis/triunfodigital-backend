import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IOfficeRepository from '@modules/organizations/repositories/IOfficeRepository';
import OfficeRepository from '@modules/organizations/infra/typeorm/repositories/OfficesRepository';
import ISubsidiaryRepository from '@modules/organizations/repositories/ISubsidiaryRepository';
import SubsidiaryRepository from '@modules/organizations/infra/typeorm/repositories/SubsidiaryRepository';
import DepartamentsRepository from '@modules/organizations/infra/typeorm/repositories/DepartamentsRepository';
import IDepartamentRepository from '@modules/organizations/repositories/IDepartamentRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IOfficeRepository>(
  'OfficesRepository',
  OfficeRepository,
);

container.registerSingleton<ISubsidiaryRepository>(
  'SubsidiariesRepository',
  SubsidiaryRepository,
);

container.registerSingleton<IDepartamentRepository>(
  'DepartamentsRepository',
  DepartamentsRepository,
);
