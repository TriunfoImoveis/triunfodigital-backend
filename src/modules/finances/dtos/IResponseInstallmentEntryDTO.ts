interface InstallmentEntry {
  id: string;
  pay_date: Date;
  subsidiary: string;
  description: string;
  paying_source: string;
  brute_value: number;
  tax_rate: number | null;
  value_note: number | null;
  empressBrute: number;
  empressLiquid: number;
  bank: string | null;
}
export default interface IResponseInstallmentEntryDTO {
  entry: InstallmentEntry[];
  totalInstallments: number;
  totalValueInstallments: number;
}
