import IResponseSaldoDTO from "@modules/externals/dtos/IResponseSaldoDTO";

export default interface ISaldoRepository {
  findAllEntrada(): Promise<void>;
  findAllSaida(): Promise<void>;
  // findById(id: string): Promise<IResponseSaldoDTO | undefined>;
}
