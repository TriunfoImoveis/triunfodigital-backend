import User from "../infra/typeorm/entities/User";

export default interface ICreateBankDataDTO {
  bank_name: string;
  account_type: string;
  agency: string;
  account: string;
  user: User;
}
