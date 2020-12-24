import Departament from '@modules/organizations/infra/typeorm/entities/Departament';
import Office from '@modules/organizations/infra/typeorm/entities/Office';
import Subsidiary from '@modules/organizations/infra/typeorm/entities/Subsidiary';

export default interface IUpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  admission_date?: Date;
  goal?: number;
  departament?: Departament;
  subsidiary?: Subsidiary;
  office?: Office;
  active?: boolean;
}
