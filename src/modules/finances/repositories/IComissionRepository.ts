import Comission from "@modules/finances/infra/typeorm/entities/Comission";

export default interface IComissionRepository {
    list(): Promise<Comission[]>;
    findByUser(
        user_id: string,
        format_date: string,
        date: string,
    ): Promise<Comission[]>;
    findBySubsidiary(
        subsidiary_id: string,
        format_date: string,
        date: string,
    ): Promise<Comission[]>;
}