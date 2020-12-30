import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import ICreateInstallmentDTO from '@modules/sales/dtos/ICreateInstallmentDTO';
import { Status } from '@modules/sales/infra/typeorm/entities/Sale';
import IInstallmentRepository from '@modules/sales/repositories/IInstallmentRepository';


interface IRequestDTO {
  id: string;
  installments: ICreateInstallmentDTO[];
}

class ValidSaleService {
  constructor(
    private salesRepository: ISaleRepository,
    private installmentRepository: IInstallmentRepository
  ) {}

  public async execute({ id, installments }: IRequestDTO): Promise<void> {
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new AppError("Sale not exists.", 404);
    } else if (sale.status !== Status.NV) {
      throw new AppError("Sale already validated.", 400);
    }
    
    var totalValueInstallments = 0;
    installments.map(
      (installment) => {
        installment.sale = sale;
        totalValueInstallments += Number(installment.value);
      }
    );
    
    if (totalValueInstallments !== Number(sale.commission)) {
      throw new AppError(
        "Commission amount different from the total amount of the installments.", 
        400
      );
    }

    if (installments.length === 1) {
      var status = Status.PT;
    } else {
      var status = Status.PE;
    }

    await this.installmentRepository.create(installments);
    await this.salesRepository.validSale(id, status);
  }
}

export default ValidSaleService;
