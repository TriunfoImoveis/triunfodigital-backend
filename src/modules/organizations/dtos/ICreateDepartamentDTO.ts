import Subsidiary from '@modules/organizations/infra/typeorm/entities/Subsidiary';

export default interface ICreateDepartamentDTO {
  name: string;
  initials: string;
  goal?: number;
  subsidiary: Subsidiary;
}
