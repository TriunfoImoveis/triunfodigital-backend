import ICreateSaleNewDTO from "@modules/sales/dtos/ICreateSaleNewDTO";
import ICreateSaleUsedDTO from "@modules/sales/dtos/ICreateSaleUsedDTO";
import Sale, { Status } from "@modules/sales/infra/typeorm/entities/Sale";
import IRequestSaleDTO from "@modules/sales/dtos/IRequestSaleDTO";
import INotValidSaleDTO from "@modules/sales/dtos/INotValidSaleDTO";
import ICreateInstallmentDTO from "@modules/finances/dtos/ICreateInstallmentDTO";
import IUpdateSaleDTO from "@modules/sales/dtos/IUpdateSaleDTO";

export default interface ISaleRepository {
  findAllWithoutFilters(): Promise<Sale[]>;
  findAll(data: IRequestSaleDTO): Promise<Sale[]>;
  findById(id: string): Promise<Sale | undefined>;

  createSaleNew(
    data: ICreateSaleNewDTO,
    installments: ICreateInstallmentDTO[]
  ): Promise<Sale | undefined>;
  createSaleUsed(
    data: ICreateSaleUsedDTO,
    installments: ICreateInstallmentDTO[]
  ): Promise<Sale | undefined>;
  update(id: string, body: IUpdateSaleDTO): Promise<Sale | undefined>;
  validSale(
    id: string,
    status: Status
  ): Promise<void>;
  notValidSale(data: INotValidSaleDTO): Promise<void>;

  salesForUserSellers(data: {id: string, month?: string, year?: string}): Promise<Sale[]>;
  salesForUserCaptivators(
    data: {id: string, month?: string, year?: string}
  ): Promise<Sale[]>;

  salesForDashboard(id: string, date: string): Promise<Sale[]>;

  salesForSubsidiary(
    id_subsidiary: string,
    format_date: string,
    date: string
  ): Promise<Sale[]>;
  // captivatorsForSubsidiary(id_subsidiary: string, date: string): Promise<Sale[]>;

  validSignal(id: string, status: Boolean): Promise<void>;
}
