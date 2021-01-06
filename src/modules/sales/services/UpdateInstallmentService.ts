import { inject, injectable } from "tsyringe";
import IInstallmentRepository from "@modules/sales/repositories/IInstallmentRepository";
import AppError from "@shared/errors/AppError";
import { StatusInstallment } from "@modules/sales/infra/typeorm/entities/Installment";
import IUpdateInstallmentDTO from "@modules/sales/dtos/IUpdateInstallmentDTO";

interface IRequestDTO {
  id: string;
  data: IUpdateInstallmentDTO;
}

@injectable()
class UpdateInstallmentService {
  constructor( 
    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,
  ) {}

  public async execute({id, data}: IRequestDTO): Promise<void> {
    const checkInstallmentExists = await this.installmentsRepository.findById(id);
    if (!checkInstallmentExists) {
      throw new AppError("Parcela não existe.", 404);
    }

    data.status = StatusInstallment.PAG;
    await this.installmentsRepository.update(id, data);
  }
}

export default UpdateInstallmentService;