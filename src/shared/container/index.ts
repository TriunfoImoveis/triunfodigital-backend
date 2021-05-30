import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IOfficeRepository from '@modules/organizations/repositories/IOfficeRepository';
import OfficeRepository from '@modules/organizations/infra/typeorm/repositories/OfficesRepository';
import ISubsidiaryRepository from '@modules/organizations/repositories/ISubsidiaryRepository';
import SubsidiaryRepository from '@modules/organizations/infra/typeorm/repositories/SubsidiaryRepository';
import DepartamentsRepository from '@modules/organizations/infra/typeorm/repositories/DepartamentsRepository';
import IDepartamentRepository from '@modules/organizations/repositories/IDepartamentRepository';
import ICompanyRepository from '@modules/organizations/repositories/ICompanyRepository';
import CompanyRepository from '@modules/organizations/infra/typeorm/repositories/CompanyRepository';

import IBuilderRepository from '@modules/sales/repositories/IBuilderRepository';
import BuildersRespository from '@modules/sales/infra/typeorm/repositories/BuildersRepository';
import IClientRepository from '@modules/sales/repositories/IClientRepository';
import ClientsRepository from '@modules/sales/infra/typeorm/repositories/ClientsRepository';
import IMotiveRepository from '@modules/sales/repositories/IMotiveRepository';
import MotiveRepository from '@modules/sales/infra/typeorm/repositories/MotiveRepository';
import IOriginRepository from '@modules/sales/repositories/IOriginRepository';
import OriginsRepository from '@modules/sales/infra/typeorm/repositories/OriginRepository';
import IPaymentTypeRepository from '@modules/sales/repositories/IPaymentTypeRepository';
import PaymentTypeRepository from '@modules/sales/infra/typeorm/repositories/PaymentTypeRepository';
import IPropertyRepository from '@modules/sales/repositories/IPropertyRepository';
import PropertiesRepository from '@modules/sales/infra/typeorm/repositories/PropertyRepository';
import IRealtyRepository from '@modules/sales/repositories/IRealtyRepository';
import RealtyRepository from '@modules/sales/infra/typeorm/repositories/RealtyRepository';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import SaleRepository from '@modules/sales/infra/typeorm/repositories/SaleRepository';

import IInstallmentRepository from '@modules/finances/repositories/IInstallmentRepository';
import InstallmentRespository from '@modules/finances/infra/typeorm/repositories/InstallmentRepository';
import IRevenueRepository from '@modules/finances/repositories/IRevenueRepository';
import RevenueRepository from '@modules/finances/infra/typeorm/repositories/RevenueRepository';
import IExpenseRepository from '@modules/finances/repositories/IExpenseRepository';
import ExpenseRepository from '@modules/finances/infra/typeorm/repositories/ExpenseRepository';
import ICalculatorRepository from '@modules/finances/repositories/ICalculatorRepository';
import CalculatorRepository from '@modules/finances/infra/typeorm/repositories/CalculatorRepository';
import IDivisionRepository from '@modules/finances/repositories/IDivisionRepository';
import DivisiionRepository from '@modules/finances/infra/typeorm/repositories/DivisionRepository';
import IComissionRepository from '@modules/finances/repositories/IComissionRepository';
import ComissionRepository from '@modules/finances/infra/typeorm/repositories/ComissionRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';


// USER
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IUserTokenRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
// USER

// ORGANIZATION
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
container.registerSingleton<ICompanyRepository>(
  'CompaniesRepository',
  CompanyRepository,
);
// ORGANIZATION

// SALE
container.registerSingleton<IBuilderRepository>(
  'BuildersRepository',
  BuildersRespository,
);
container.registerSingleton<IClientRepository>(
  'ClientsRepository',
  ClientsRepository,
);
container.registerSingleton<IMotiveRepository>(
  'MotivesRepository',
  MotiveRepository,
);
container.registerSingleton<IOriginRepository>(
  'OriginsRepository',
  OriginsRepository,
);
container.registerSingleton<IPaymentTypeRepository>(
  'PaymentTypesRepository',
  PaymentTypeRepository,
);
container.registerSingleton<IPropertyRepository>(
  'PropertiesRepository',
  PropertiesRepository,
);
container.registerSingleton<IRealtyRepository>(
  'RealtiesRepository',
  RealtyRepository,
);
container.registerSingleton<ISaleRepository>(
  'SalesRepository',
  SaleRepository,
);
// SALE

// FINANCE
container.registerSingleton<IInstallmentRepository>(
  'InstallmentsRepository',
  InstallmentRespository,
);
container.registerSingleton<IRevenueRepository>(
  'RevenueRepository',
  RevenueRepository,
);
container.registerSingleton<IExpenseRepository>(
  'ExpenseRepository',
  ExpenseRepository,
);
container.registerSingleton<ICalculatorRepository>(
  'CalculatorRepository',
  CalculatorRepository,
);
container.registerSingleton<IDivisionRepository>(
  'DivisionRepository',
  DivisiionRepository,
);
container.registerSingleton<IComissionRepository>(
  'ComissionRepository',
  ComissionRepository,
);
// FINANCE

// NOTIFICATION
container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
// NOTIFICATION