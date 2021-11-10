import { inject, injectable } from 'tsyringe';

import IResponseSaldoDTO from '@modules/externals/dtos/IResponseSaldoDTO';
import IDespesaRepository from '@modules/externals/repositories/IDespesaRepository';
import IRequestSaldoDTO from '@modules/externals/dtos/IRequestSaldoDTO';
import Despesa from '../infra/typeorm/entities/Despesa';

@injectable()
class ListSaldoService {
  constructor(
    @inject('DespesaRepository')
    private despesasRepository: IDespesaRepository,
  ) {}

  public async execute({escritorio, conta}: IRequestSaldoDTO): Promise<void> {
    // const despesas = await this.despesasRepository.findByFilters({
    //   escritorio, 
    //   conta
    // });

    // const saldoEntradas = despesas.map(despesa => {
    //   if (despesa.tipo_despesa === 'ENTRADA') return Number(despesa.valor);
    //   else return 0;
    // }).reduce((sum, valor) => sum + valor);

    // const saldoSaidas = despesas.map(despesa => {
    //   if (despesa.tipo_despesa === 'SAIDA') return Number(despesa.valor);
    //   else return 0;
    // }).reduce((sum, valor) => sum + valor);
    
    // return {
    //   saldo_entrada: saldoEntradas,
    //   saldo_saida: saldoSaidas,
    //   saldo_total: saldoEntradas - saldoSaidas,
    // };
  }
}

function saldo() {
  
}

export default ListSaldoService;
