import Conta from "@modules/externals/infra/typeorm/entities/Conta";
import Escritorio from "@modules/externals/infra/typeorm/entities/Escritorio";

export default interface IResponseSaldoDTO {
    escritorio: Escritorio | undefined;
    conta: Conta | undefined;
    saldo: number;
}