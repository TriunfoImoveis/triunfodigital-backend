import { inject, injectable } from "tsyringe";
import { parseISO } from "date-fns";

import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import IExpenseRepository from "@modules/finances/repositories/IExpenseRepository";
import { ExpenseStatus } from "@modules/finances/infra/typeorm/entities/Expense";
import verify_due_date from "@shared/utils/verify_due_date";

interface IResponseDTO {
  link_url: string;
}

@injectable()
class ExportExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,

    @inject('StorageProvider')
    private storagePrivider: IStorageProvider,
  ) {}

  public async execute(): Promise<IResponseDTO | undefined> {
    const expenses = await this.expenseRepository.listAll();

    const workSheetColumnNames = [
      { header: 'TIPO DE DESPESA', key: 'expense_type', width: 15},
      { header: 'GRUPO', key: 'group', width: 20 },
      { header: 'FILIAL', key: 'subsidiary', width: 15 },
      { header: 'DESCRIÇÃO', key: 'description', width: 30 },
      { header: 'VENCIMENTO', key: 'due_date', width: 15, style: {numFmt: 'dd/mm/yyyy'} },
      { header: 'VALOR', key: 'value', width: 15, style: {numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00'} },
      { header: 'DATA DE PAGAMENTO', key: 'pay_date', width: 15, style: {numFmt: 'dd/mm/yyyy'} },
      { header: 'VALOR PAGO', key: 'value_paid', width: 15, style: {numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00'} },
      { header: 'CONTA DE SAIDA', key: 'bank_data', width: 20 },
      { header: 'USUARIO', key: 'user', width: 20 },
      { header: 'STATUS', key: 'status', width: 15 },
    ]

    const data = expenses.map((expense) => {
      return {
        expense_type: expense.expense_type,
        group: expense.group.name,
        subsidiary: expense.subsidiary.city,
        description: expense.description,
        due_date: parseISO(expense.due_date.toString()),
        value: Number(expense.value),
        pay_date: expense.pay_date ? parseISO(expense.pay_date.toString()) : null,
        value_paid: expense.value_paid ? Number(expense.value_paid): null,
        bank_data: expense.bank_data ? `AG: ${expense.bank_data.agency} / CONTA: ${expense.bank_data.account}` : null,
        user: expense.user ? expense.user.email : null,
        status: expense.status === ExpenseStatus.PEND ? verify_due_date(expense.due_date) : expense.status,
      }
    });

    const filePath = await this.storagePrivider.saveReportFile(
      {
        workSheetData: {
          headers: workSheetColumnNames,
          data: data
        },
        fileName: 'expenses',
        refCol: "A1:K1"
      }
    );

    return {
      link_url: filePath
    };
  }
}

export default ExportExpenseService;
