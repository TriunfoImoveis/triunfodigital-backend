import Subsidiary from '@modules/users/infra/typeorm/entities/Subsidiary';

export default interface IUpdateDepartamentDTO {
  name?: string;
  initials?: string;
  goal?: number;
  subsidiary?: Subsidiary;
  active?: boolean;
}
