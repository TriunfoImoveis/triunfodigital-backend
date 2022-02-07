import { inject, injectable } from 'tsyringe';

import IDespesaRepository from '@modules/externals/repositories/IDespesaRepository';
import Despesa from '@modules/externals/infra/typeorm/entities/Despesa';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteDespesaService {
  constructor(
    @inject('DespesaRepository')
    private despesasRepository: IDespesaRepository,
  ) {}

  public async execute(ids: string[]): Promise<void> {
    ids.forEach(async (id) => {
      const despesa = await this.despesasRepository.findById(id);

      if (despesa) {
        await this.despesasRepository.delete(id);
      }
    });
  }
}

export default DeleteDespesaService;
