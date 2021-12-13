import { TipoDespesa } from "@modules/externals/infra/typeorm/entities/Despesa";
import GroupExpense from "@modules/finances/infra/typeorm/entities/GroupExpense";
import Subsidiary from "@modules/organizations/infra/typeorm/entities/Subsidiary";
import BankData from "@modules/users/infra/typeorm/entities/BankData";

export default interface ICreateDespesaDTO {
    tipo_despesa: TipoDespesa;
    grupo: GroupExpense;
    descricao: string;
    valor: number;
    data_pagamento: Date;
    escritorio: Subsidiary;
    conta: BankData;
}