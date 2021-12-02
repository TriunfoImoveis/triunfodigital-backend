import { inject, injectable } from 'tsyringe';
import { add } from 'date-fns';

import IDespesaRepository from '@modules/externals/repositories/IDespesaRepository';
import IUpdateDespesaDTO from '@modules/externals/dtos/IUpdateDespesaDTO';
import AppError from '@shared/errors/AppError';

@injectable()
class UpdateDespesaService {
  constructor(
    @inject('DespesaRepository')
    private despesasRepository: IDespesaRepository,
  ) {}

  public async execute(id: string, data: IUpdateDespesaDTO): Promise<void> {
    const despesa = await this.despesasRepository.findById(id);

    if (!despesa) {
      throw new AppError("Despesa não encontrada.", 404);
    }

    if (data.data_pagamento) {
      data.data_pagamento = add(data.data_pagamento, {hours: 3});
    }

    await this.despesasRepository.update(id, data);
  }
}

export default UpdateDespesaService;
