import { inject, injectable } from "tsyringe";
import { parseISO } from "date-fns";

import IDespesaRepository from "@modules/externals/repositories/IDespesaRepository";
import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";


interface IRequestDTO {
  start_date: string;
  end_date: string;
}
interface IResponseDTO {
  link_url: string;
}

@injectable()
class ExportDespesaService {
  constructor(
    @inject('DespesaRepository')
    private despesasRepository: IDespesaRepository,

    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,

    @inject('StorageProvider')
    private storagePrivider: IStorageProvider,
  ) {}

  public async execute({
    start_date, end_date
  }: IRequestDTO): Promise<IResponseDTO | undefined> {
    const despesas = await this.despesasRepository.findByFilters({
      escritorio: "%",
      conta: "%",
      data_inicio: start_date,
      data_fim: end_date
    });
    const expenses = await this.expenseRepository.findByFilters({
      escritorio: "%",
      conta: "%",
      data_inicio: start_date,
      data_fim: end_date
    });

    const workSheetColumnNames = [
      { header: 'FILIAL', key: 'subsidiary', width: 20 },
      { header: 'GRUPO', key: 'group', width: 20 },
      { header: 'DESCRIÇÃO', key: 'description', width: 40 },
      { header: 'TIPO', key: 'type', width: 15 },
      { header: 'VALOR PAGO', key: 'pay_value', width: 20, style: { numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00' } },
      { header: 'DATA PAGAMENTO', key: 'pay_date', width: 20, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'BANCO - AGENCIA - CONTA', key: 'account', width: 30 },
    ]

    const despesas_formated = despesas.map(despesa => {
      return {
        subsidiary: despesa.escritorio.name,
        group: despesa.grupo.name,
        description: despesa.descricao,
        type: String(despesa.tipo_despesa),
        pay_value: Number(despesa.valor),
        pay_date: parseISO(despesa.data_pagamento.toString()),
        account: `${despesa.conta.bank_name} - ${despesa.conta.agency} - ${despesa.conta.account}`,
      }
    });

    const expenses_formated = expenses.map(expense => {
      return {
        subsidiary: expense.subsidiary.name,
        group: expense.group.name,
        description: expense.description,
        type: "SAIDA",
        pay_value: Number(expense.value_paid),
        pay_date: parseISO(expense.pay_date.toString()),
        account: `${expense.bank_data.bank_name} - ${expense.bank_data.agency} - ${expense.bank_data.account}`,
      }
    });

    const data = [...despesas_formated, ...expenses_formated]
    data.sort((a, b) => { 
      return b.pay_date.getTime() - a.pay_date.getTime();
    });

    const filePath = await this.storagePrivider.saveReportFile(
      {
        workSheetData: {
          headers: workSheetColumnNames,
          data: data
        },
        fileName: 'despesas',
        refCol: "A1:G1"
      }
    );

    return {
      link_url: filePath
    };
  }
}

export default ExportDespesaService;