import GroupExpense from "@modules/finances/infra/typeorm/entities/GroupExpense";

export default interface IUpdateDespesaDTO {
    grupo: GroupExpense | undefined;
    descricao: string | undefined;
    valor: number | undefined;
    data_pagamento: Date | undefined;
}