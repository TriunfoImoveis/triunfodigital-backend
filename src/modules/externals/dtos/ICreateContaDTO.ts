import { TipoConta } from "@modules/externals/infra/typeorm/entities/Conta";

export default interface ICreateContaDTO {
    nome_banco: string;
    tipo_conta: TipoConta;
    agencia: string;
    conta: string;
}