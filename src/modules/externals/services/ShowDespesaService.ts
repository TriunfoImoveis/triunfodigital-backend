import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDespesaRepository from '@modules/externals/repositories/IDespesaRepository';
import Despesa from '@modules/externals/infra/typeorm/entities/Despesa';

@injectable()
class ShowDespesaService {
  constructor(
    @inject('DespesaRepository')
    private despesasRepository: IDespesaRepository,
  ) {}

  public async execute(id: string): Promise<Despesa> {
    const despesa = await this.despesasRepository.findById(id);

    if (!despesa) {
        throw new AppError("Nenhum item encontrado!", 404);
    }

    return despesa;
  }
}

export default ShowDespesaService;
