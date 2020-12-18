import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import Sale, { Status } from '@modules/sales/infra/typeorm/entities/Sale';


interface IRequestDTO {
  id: string;
}

class NotValidSaleService {
  constructor(private salesRepository: ISaleRepository) {}

  public async execute({ id }: IRequestDTO): Promise<void> {
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new AppError('Sale not exists.');
    }

    const status = Status.CA;
    await this.salesRepository.validSale(id, status);
  }
}

export default NotValidSaleService;
