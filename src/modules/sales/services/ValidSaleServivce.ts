import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import ICreateInstallmentDTO from '@modules/sales/dtos/ICreateInstallmentDTO';
import Sale, { Status } from '@modules/sales/infra/typeorm/entities/Sale';
import IInstallmentRepository from '../repositories/IInstallmentRepository';


interface IRequestDTO {
  id: string;
  installments: ICreateInstallmentDTO[];
}

class ValidSaleService {
  constructor(
    private salesRepository: ISaleRepository,
    private instalmentRepository: IInstallmentRepository
  ) {}

  public async execute({ id, installments }: IRequestDTO): Promise<void> {
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new AppError('Sale not exists.');
    }

    installments.map(
      async (installment) => {
        installment.sale = sale;
        await this.instalmentRepository.create(installment);
      }
    );

    if (installments.length === 1) {
      var status = Status.PT;
    } else {
      var status = Status.PE;
    }

    await this.salesRepository.validSale(id, status);
  }
}

export default ValidSaleService;
