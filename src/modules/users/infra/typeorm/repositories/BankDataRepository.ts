import ICreateBankDataDTO from "@modules/users/dtos/ICreateBankDataDTO";
import IBankDataRepository from "@modules/users/repositories/IBankDataRepository";
import BankData, { AccountType } from "../entities/BankData";
import { getRepository, Repository } from "typeorm";
import AppError from "@shared/errors/AppError";

class BankDataRepository implements IBankDataRepository {
  private ormRepository: Repository<BankData>;

  constructor() {
    this.ormRepository = getRepository(BankData);
  }
  async findById(id: string): Promise<BankData | undefined> {
    const bankData = await this.ormRepository.findOne(id);
    return bankData || undefined;
  }
  async save(bankData: BankData): Promise<BankData> {
    return await this.ormRepository.save(bankData);
  }
  async create(data: ICreateBankDataDTO): Promise<BankData | undefined> {
    try {
      const bankData = this.ormRepository.create({
        account: data.account,
        agency: data.agency,
        bank_name: data.bank_name,
        account_type: data.account_type as AccountType,
        user: data.user
      });
      const newBankData = await this.ormRepository.save(bankData);

      return newBankData;
    } catch (err) {
      console.log(err);
      throw new AppError(err.detail);
    }
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

}

export default BankDataRepository;
