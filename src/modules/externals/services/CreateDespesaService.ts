import { inject, injectable } from 'tsyringe';
import { add } from 'date-fns';

import IDespesaRepository from '@modules/externals/repositories/IDespesaRepository';
import ICreateDespesaDTO from '@modules/externals/dtos/ICreateDespesaDTO';
import Despesa from '@modules/externals/infra/typeorm/entities/Despesa';

@injectable()
class CreateDespesaService {
  constructor(
    @inject('DespesaRepository')
    private despesasRepository: IDespesaRepository,
  ) {}

  public async execute(data: ICreateDespesaDTO): Promise<Despesa> {
    data.data_pagamento = add(data.data_pagamento, {hours: 3});

    const despesa = await this.despesasRepository.create(data);

    return despesa;
  }
}

export default CreateDespesaService;
