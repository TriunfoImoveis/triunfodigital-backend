import ICreateMotiveDTO from "@modules/sales/dtos/ICreateMotiveDTO";
import Motive from "@modules/sales/infra/typeorm/entities/Motive";

export default interface IMotiveRepository {
    findAll(): Promise<Motive[]>;
    findById(id: string): Promise<Motive | undefined>;
    create(data: ICreateMotiveDTO): Promise<Motive | undefined>;
}