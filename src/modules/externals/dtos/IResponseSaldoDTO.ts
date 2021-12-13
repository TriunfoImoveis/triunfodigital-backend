import Despesa from "@modules/externals/infra/typeorm/entities/Despesa";
import Expense from "@modules/finances/infra/typeorm/entities/Expense";

export default interface IResponseSaldoDTO {
    saldo_entrada: Number;
    saldo_saida: Number;
    saldo_total: Number;
    despesas: Despesa[];
    expenses: Expense[];
}