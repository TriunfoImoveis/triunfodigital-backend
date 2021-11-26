import Despesa from "@modules/externals/infra/typeorm/entities/Despesa";

export default interface IResponseSaldoDTO {
    saldo_entrada: Number;
    saldo_saida: Number;
    saldo_total: Number;
    despesas: Despesa[];
}