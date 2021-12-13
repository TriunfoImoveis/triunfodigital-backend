import { inject, injectable } from 'tsyringe';

import IDespesaRepository from '@modules/externals/repositories/IDespesaRepository';
import IRequestSaldoDTO from '@modules/externals/dtos/IRequestSaldoDTO';
import IResponseSaldoDTO from '@modules/externals/dtos/IResponseSaldoDTO';
import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import AppError from '@shared/errors/AppError';

@injectable()
class ListDespesaService {
  constructor(
    @inject('DespesaRepository')
    private despesasRepository: IDespesaRepository,

    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
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

    const expenses = await this.expenseRepository.findByFilters({
      escritorio,
      conta,
      data_inicio,
      data_fim,
    });

    var saldoEntradas = 0;
    var saldoSaidas = 0;
    var saldoExpenses = 0;

    if (expenses.length) {
      saldoExpenses = expenses.map(
        expense => Number(expense.value_paid)
      ).reduce((sum, valor) => sum + valor);
    }

    if (despesas.length) {
      saldoEntradas = despesas.map(despesa => {
        if (despesa.tipo_despesa === 'ENTRADA') return Number(despesa.valor);
        else return 0;
      }).reduce((sum, valor) => sum + valor);

      saldoSaidas = despesas.map(despesa => {
        if (despesa.tipo_despesa === 'SAIDA') return Number(despesa.valor);
        else return 0;
      }).reduce((sum, valor) => sum + valor);
    }

    const saldoTotalSaidas = saldoSaidas+saldoExpenses;
    const saldoTotal = saldoEntradas - saldoTotalSaidas;
    
    return {
      saldo_entrada: saldoEntradas,
      saldo_saida: saldoTotalSaidas,
      saldo_total: saldoTotal,
      despesas: despesas,
      expenses: expenses,
    };
  }
}

export default ListDespesaService;
