import Departament from '@modules/users/infra/typeorm/entities/Departament';
import Office from '@modules/users/infra/typeorm/entities/Office';

export default interface ICreateUsersDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  admission_date: Date;
  goal: number;
  departament: Departament;
  office: Office;
}
