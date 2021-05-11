import Installment from "@modules/finances/infra/typeorm/entities/Installment";
import Division from "@modules/finances/infra/typeorm/entities/Division";

export default interface ICreateCalculatorDTO {
  installment: Installment;
  calculator_type?: string;
  division_pl: Division;
  division_lucro: Division;
  division_tax: Division;
  division_other_one?: Division;
  division_other_two?: Division;
  division_other_three?: Division;
}