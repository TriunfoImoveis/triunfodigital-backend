import Departament from '@modules/organizations/infra/typeorm/entities/Departament';
import Office from '@modules/organizations/infra/typeorm/entities/Office';
import Subsidiary from '@modules/organizations/infra/typeorm/entities/Subsidiary';
import BankData from '@modules/users/infra/typeorm/entities/BankData';

export default interface ICreateUsersDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  admission_date: Date;
  goal: number;
  creci?: string;
  departament: Departament;
  subsidiary: Subsidiary;
  office: Office;
  bank_data: BankData;
}
