import { TipoDespesa } from "@modules/externals/infra/typeorm/entities/Despesa";
import Escritorio from "@modules/externals/infra/typeorm/entities/Escritorio";
import Conta from "@modules/externals/infra/typeorm/entities/Conta";

export default interface ICreateDespesaDTO {
    tipo_despesa: TipoDespesa;
    descricao: string;
    valor: number;
    escritorio: Escritorio;
    conta: Conta;
}