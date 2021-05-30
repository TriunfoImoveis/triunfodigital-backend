import Comission from "@modules/finances/infra/typeorm/entities/Comission";

export default interface IComissionRepository {
    list(): Promise<Comission[]>;
}