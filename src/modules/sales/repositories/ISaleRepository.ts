import ICreateSaleNewDTO from "@modules/sales/dtos/ICreateSaleNewDTO";
import ICreateSaleUsedDTO from "@modules/sales/dtos/ICreateSaleUsedDTO";
import Sale, { Status } from "@modules/sales/infra/typeorm/entities/Sale";
import IRequestSaleDTO from "@modules/sales/dtos/IRequestSaleDTO";
import INotValidSaleDTO from "../dtos/INotValidSaleDTO";
import ICreateInstallmentDTO from "../dtos/ICreateInstallmentDTO";
import Installment from "@modules/sales/infra/typeorm/entities/Installment";
import IUpdateSaleDTO from "@modules/sales/dtos/IUpdateSaleDTO";

export default interface ISaleRepository {
  findAll(data: IRequestSaleDTO): Promise<Sale[]>;
  findById(id: string): Promise<Sale | undefined>;

  createSaleNew(data: ICreateSaleNewDTO): Promise<Sale | undefined>;
  createSaleUsed(data: ICreateSaleUsedDTO): Promise<Sale | undefined>;
  update(id: string, body: IUpdateSaleDTO): Promise<Sale | undefined>;
  validSale(
    id: string, 
    status: Status
  ): Promise<void>;
  notValidSale(data: INotValidSaleDTO): Promise<void>;

  salesForUserAndYear(id: string, year: number): Promise<Sale[]>;
  salesForUserAndMonthAndYear(
    id: string,
    month: number,
    year: number,
  ): Promise<Sale[]>;
}
