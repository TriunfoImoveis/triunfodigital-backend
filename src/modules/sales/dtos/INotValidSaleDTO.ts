import Motive from "@modules/sales/infra/typeorm/entities/Motive";
import { Status } from "@modules/sales/infra/typeorm/entities/Sale";

export default interface INotValidSaleDTO {
    id: string;
    status: Status;
    motive?: Motive;
    another_motive?: string;
}