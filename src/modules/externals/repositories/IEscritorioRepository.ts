import Escritorio from "@modules/externals/infra/typeorm/entities/Escritorio";

export default interface IEscritorioRepository {
  findById(id: string): Promise<Escritorio | undefined>;
  findAll(): Promise<Escritorio[]>;
}
