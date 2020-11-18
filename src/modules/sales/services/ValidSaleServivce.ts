import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import IValidSaleDTO from '@modules/sales/dtos/IValidSaleDTO';


interface IRequestDTO {
  id: string;
  data: IValidSaleDTO
}

class ValidSaleService {
  constructor(private salesRepository: ISaleRepository) {}

  public async execute({ id, data }: IRequestDTO): Promise<Sale> {
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new AppError('Sale not exists.');
    }

    const saleValidated = await this.salesRepository.validSale(id, data);

    if (!saleValidated) {
      throw new AppError('Error when validating the Sale, check your data.');
    }

    return saleValidated;
  }
}

export default ValidSaleService;
