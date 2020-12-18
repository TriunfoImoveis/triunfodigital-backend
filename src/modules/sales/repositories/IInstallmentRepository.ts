import ICreateInstallmentDTO from '@modules/sales/dtos/ICreateInstallmentDTO';

export default interface IInstallmentRepository {
    create(data: ICreateInstallmentDTO): Promise<void>;
}