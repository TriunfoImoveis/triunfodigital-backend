import { inject, injectable } from 'tsyringe';

import IResponseSaldoDTO from '@modules/externals/dtos/IResponseSaldoDTO';
import IDespesaRepository from '@modules/externals/repositories/IDespesaRepository';

@injectable()
class ListSaldoService {
  constructor(
    @inject('DespesaRepository')
    private despesasRepository: IDespesaRepository,
  ) {}

  public async execute(): Promise<void> {
    const saldos = await this.despesasRepository.findSaldoByFilial();

    // return saldos;
  }
}

export default ListSaldoService;
