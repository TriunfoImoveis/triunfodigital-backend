import Comission from "@modules/finances/infra/typeorm/entities/Comission";

export default interface IComissionRepository {
    list(): Promise<Comission[]>;
    findByUser(
        user_id: string,
        date: string,
    ): Promise<Comission[]>;
}