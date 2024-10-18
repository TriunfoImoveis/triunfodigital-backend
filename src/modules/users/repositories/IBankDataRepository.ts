import ICreateBankDataDTO from "../dtos/ICreateBankDataDTO";
import BankData from "../infra/typeorm/entities/BankData";

export default interface IUserRepository {
  create(data: ICreateBankDataDTO): Promise<BankData | undefined>;
  findById(id: string): Promise<BankData | undefined>;
  save(bankData: BankData): Promise<BankData>;
  delete(id: string): Promise<void>;
}
