import {hash, compare} from 'bcryptjs';
import { container, inject, injectable } from 'tsyringe';
import { add } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import SendValidEmailService from './SendValidEmailService';
import BankData from '../infra/typeorm/entities/BankData';
import IBankDataRepository from '../repositories/IBankDataRepository';
import BankDataController from '../infra/http/controllers/BankDataController';
import ICreateBankDataDTO from '../dtos/ICreateBankDataDTO';

interface IRequestDTO {
  bank: {
    id?: string;
    bank_name?: string;
    account_type?: string;
    agency?: string;
    account?: string;
    user: string;
  };
}

@injectable()
class UpdateBankDataService {
  constructor(
    @inject('BankDataRepository')
    private bankDataRepository: IBankDataRepository,
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    bank
  }: IRequestDTO): Promise<BankData | undefined> {

    const {
      id = "",
      account = "",
      account_type = "",
      agency = "",
      bank_name = "",
      user = ""
    } = bank

    const userExists = await this.usersRepository.findById(user);

    if (!userExists) {
      throw new AppError(
        "Usuario inexistente, cheque seus dados e tente novamente.",
        400
      );
    }

    const bankData = await this.bankDataRepository.findById(id);

    if (!bankData) {
      throw new AppError('Dados bancários não encontrados.', 404);
    }

    Object.assign(bankData, {
      account,
      account_type,
      agency,
      bank_name,
    });

    if (!bankData) {
      throw new AppError(
        "Erro ao criar a conta bancária, cheque seus dados e tente novamente.",
        400
      );
    }

    const saveBankData = await this.bankDataRepository.save(bankData);
    return saveBankData;
  }
}

export default UpdateBankDataService;
