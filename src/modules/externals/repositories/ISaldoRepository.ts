import IResponseSaldoDTO from "@modules/externals/dtos/IResponseSaldoDTO";

export default interface ISaldoRepository {
  findAll(): Promise<void>;
  // findById(id: string): Promise<IResponseSaldoDTO | undefined>;
}
