import ICreateSaleNewDTO from "@modules/sales/dtos/ICreateSaleNewDTO";
import ICreateSaleUsedDTO from "@modules/sales/dtos/ICreateSaleUsedDTO";
import Sale from "@modules/sales/infra/typeorm/entities/Sale";
import IValidSaleDTO from "@modules/sales/dtos/IValidSaleDTO";
import IRequestSaleDTO from "@modules/sales/dtos/IRequestSaleDTO";

export default interface ISaleRepository {
  findAll(data: IRequestSaleDTO): Promise<Sale[]>;
  findById(id: string): Promise<Sale | undefined>;

  createSaleNew(data: ICreateSaleNewDTO): Promise<Sale | undefined>;
  createSaleUsed(data: ICreateSaleUsedDTO): Promise<Sale | undefined>;
  validSale(id: string, data: IValidSaleDTO): Promise<Sale | undefined>;

  salesForUserAndYear(id: string, year: number): Promise<Sale[]>;
  salesForUserAndMonthAndYear(
    id: string,
    month: number,
    year: number,
  ): Promise<Sale[]>;
}
