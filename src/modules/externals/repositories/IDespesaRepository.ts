import ICreateDespesaDTO from "@modules/externals/dtos/ICreateDespesaDTO";
import Despesa from "@modules/externals/infra/typeorm/entities/Despesa";
import IRequestSaldoDTO from "@modules/externals/dtos/IRequestSaldoDTO";
import IUpdateDespesaDTO from "@modules/externals/dtos/IUpdateDespesaDTO";


export default interface IDespesaRepository {
  findById(id: string): Promise<Despesa | undefined>;
  findAll(): Promise<Despesa[]>;
  create(data: ICreateDespesaDTO): Promise<Despesa>;
  update(id: string, data: IUpdateDespesaDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findByFilters(filters: IRequestSaldoDTO): Promise<Despesa[]>;
}
