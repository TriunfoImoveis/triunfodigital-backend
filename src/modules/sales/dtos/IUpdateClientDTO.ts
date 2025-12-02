import { CivilStatus, Gender } from "@modules/sales/infra/typeorm/entities/Client";

export default interface IUpdateClientDTO {
  name?: string;
  cpf?: string;
  cnpj?: string;
  date_birth?: Date;
  email?: string;
  phone?: string;
  profession_id?: string;
  origin_id?: string;
  civil_status?: CivilStatus;
  number_children?: number;
  gender?: Gender;
  address?: string;
}
