import ICreateSaleDTO from "@modules/sales/dtos/ICreateSaleDTO";
import Sale from "@modules/sales/infra/typeorm/entities/Sale";

export default interface ISaleRepository {
  findAll(): Promise<Sale[]>;
  findById(id: string): Promise<Sale | undefined>;
  create(data: ICreateSaleDTO): Promise<Sale | undefined>;
}
