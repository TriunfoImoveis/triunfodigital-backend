import { inject, injectable } from 'tsyringe';

import IDespesaRepository from '@modules/externals/repositories/IDespesaRepository';
import IRequestSaldoDTO from '@modules/externals/dtos/IRequestSaldoDTO';
import IResponseSaldoDTO from '@modules/externals/dtos/IResponseSaldoDTO';
import AppError from '@shared/errors/AppError';

@injectable()
class ListDespesaService {
  constructor(
    @inject('DespesaRepository')
    private despesasRepository: IDespesaRepository,
  ) {}

  public async execute({
    escritorio, 
    conta, 
    data_inicio, 
    data_fim
  }: IRequestSaldoDTO): Promise<IResponseSaldoDTO> {
    const despesas = await this.despesasRepository.findByFilters({
      escritorio,
      conta,
      data_inicio,
      data_fim,
    });

    if (despesas.length === 0) {
      throw new AppError("Nenhuma despesa encontrada.", 404);
    }

    const saldoEntradas = despesas.map(despesa => {
      if (despesa.tipo_despesa === 'ENTRADA') return Number(despesa.valor);
      else return 0;
    }).reduce((sum, valor) => sum + valor);

    const saldoSaidas = despesas.map(despesa => {
      if (despesa.tipo_despesa === 'SAIDA') return Number(despesa.valor);
      else return 0;
    }).reduce((sum, valor) => sum + valor);
    
    return {
      saldo_entrada: saldoEntradas,
      saldo_saida: saldoSaidas,
      saldo_total: saldoEntradas - saldoSaidas,
      despesas: despesas,
    };
  }
}

export default ListDespesaService;
