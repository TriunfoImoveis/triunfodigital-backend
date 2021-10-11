import { inject, injectable } from 'tsyringe';

import IDespesaRepository from '@modules/externals/repositories/IDespesaRepository';
import Despesa from '@modules/externals/infra/typeorm/entities/Despesa';

@injectable()
class ListDespesaService {
  constructor(
    @inject('DespesaRepository')
    private officesRepository: IDespesaRepository,
  ) {}

  public async execute(): Promise<Despesa[]> {
    const despesas = await this.officesRepository.findAll();

    return despesas;
  }
}

export default ListDespesaService;
