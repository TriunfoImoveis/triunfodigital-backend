import { inject, injectable } from "tsyringe";

import IOfficeRepository from "@modules/organizations/repositories/IOfficeRepository";
import Office from "@modules/organizations/infra/typeorm/entities/Office";

@injectable()
class ListOfficeService {
  constructor(
    @inject('OfficesRepository')
    private officesRepository: IOfficeRepository,
  ){}

  public async execute(): Promise<Office[]> {
    const offices = await this.officesRepository.findOfficesActive();

    return offices;
  }
}

export default ListOfficeService;