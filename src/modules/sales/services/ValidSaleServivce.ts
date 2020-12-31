import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import ICreateInstallmentDTO from '@modules/sales/dtos/ICreateInstallmentDTO';
import { Status } from '@modules/sales/infra/typeorm/entities/Sale';


interface IRequestDTO {
  id: string;
  installments: ICreateInstallmentDTO[];
}

class ValidSaleService {
  constructor(
    private salesRepository: ISaleRepository,
  ) {}

  public async execute({ id, installments }: IRequestDTO): Promise<void> {
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new AppError("Venda não existe.", 404);
    } else if (sale.status !== Status.NV) {
      throw new AppError("Venda já validada.", 400);
    }

    if (installments.length === 1) {
      var status = Status.PT;
    } else {
      var status = Status.PE;
    }

    await this.salesRepository.validSale(id, status);
  }
}

export default ValidSaleService;
