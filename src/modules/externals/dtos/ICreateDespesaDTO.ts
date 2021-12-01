import { TipoDespesa } from "@modules/externals/infra/typeorm/entities/Despesa";
import Escritorio from "@modules/externals/infra/typeorm/entities/Escritorio";
import Conta from "@modules/externals/infra/typeorm/entities/Conta";
import GroupExpense from "@modules/finances/infra/typeorm/entities/GroupExpense";

export default interface ICreateDespesaDTO {
    tipo_despesa: TipoDespesa;
    grupo: GroupExpense;
    descricao: string;
    valor: number;
    escritorio: Escritorio;
    conta: Conta;
}