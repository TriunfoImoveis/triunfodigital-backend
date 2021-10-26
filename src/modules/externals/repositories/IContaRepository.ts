import Conta from "@modules/externals/infra/typeorm/entities/Conta";

export default interface IContaRepository {
  findById(id: string): Promise<Conta | undefined>;
  findAll(): Promise<Conta[]>;
}
