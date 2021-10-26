import { inject, injectable } from 'tsyringe';

import IContaRepository from '@modules/externals/repositories/IContaRepository';
import Conta from '@modules/externals/infra/typeorm/entities/Conta';

@injectable()
class ListContaService {
  constructor(
    @inject('ContaRepository')
    private contasRepository: IContaRepository,
  ) {}

  public async execute(): Promise<Conta[]> {
    const contas = await this.contasRepository.findAll();

    return contas;
  }
}

export default ListContaService;
