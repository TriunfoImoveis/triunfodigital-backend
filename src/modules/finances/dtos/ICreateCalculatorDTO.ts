import Division from "@modules/finances/infra/typeorm/entities/Division";
import Comission from "@modules/finances/infra/typeorm/entities/Comission";
import Installment from "@modules/finances/infra/typeorm/entities/Installment";
import BankData from "@modules/users/infra/typeorm/entities/BankData";

export default interface ICreateCalculatorDTO {
  installment: Installment;
  calculator_type?: string;
  balance: number;
  note_number?: string;
  note_value?: number;
  tax_rate_nf?: number;
  tax_iss_nf?: number;
  value_iss?: number;
  tax_collection?: number;
  bank_data: BankData;
  divisions: Division[];
  participants: Comission[];
}