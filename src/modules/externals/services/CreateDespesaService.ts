import { inject, injectable } from 'tsyringe';

import IDespesaRepository from '@modules/externals/repositories/IDespesaRepository';
import ICreateDespesaDTO from '@modules/externals/dtos/ICreateDespesaDTO';
import Despesa from '@modules/externals/infra/typeorm/entities/Despesa';

@injectable()
class CreateDespesaService {
  constructor(
    @inject('DespesaRepository')
    private officesRepository: IDespesaRepository,
  ) {}

  public async execute(data: ICreateDespesaDTO): Promise<Despesa> {
    const despesa = await this.officesRepository.create(data);

    return despesa;
  }
}

export default CreateDespesaService;
