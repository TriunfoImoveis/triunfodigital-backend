import AppError from '@shared/errors/AppError';
import ICreateRealtyDTO from "@modules/sales/dtos/ICreateRealtyDTO";
import Realty from "@modules/sales/infra/typeorm/entities/Realty";
import RealtyRepository from "@modules/sales/infra/typeorm/repositories/RealtyRepository";

class CreateRealtyService {
  constructor(private realtyRepository: RealtyRepository){}

  public async execute({
    enterprise,
    unit,
    state,
    city,
    neighborhood,
    property,
  }: ICreateRealtyDTO): Promise<Realty> {

    const newRealty = await this.realtyRepository.createInstance({
      enterprise,
      unit,
      state,
      city,
      neighborhood,
      property,
    });

    if (!newRealty) {
      throw new AppError(
        "Erro durante a criação do imóvel, ckeck seus dados",
        400
      );
    }

    return newRealty;
  }
}

export default CreateRealtyService;
