import Division from "@modules/finances/infra/typeorm/entities/Division";

export default interface ICreateCalculatorDTO {
  installment: string;
  calculator_type?: string;
  note_value: number;
  tax_rate: number;
  division_pl: Division;
  division_lucro: Division;
  division_tax: Division;
  division_other_one?: Division;
  division_other_two?: Division;
  division_other_three?: Division;
}