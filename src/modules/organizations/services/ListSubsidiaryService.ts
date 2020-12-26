import ISubsidiaryRepository from "@modules/organizations/repositories/ISubsidiaryRepository";
import { inject, injectable } from "tsyringe";
import Subsidiary from "../infra/typeorm/entities/Subsidiary";

@injectable()
class ListSubsidiaryService {
    constructor(
        @inject('SubsidiariesRepository')
        private subsidiariesRepository: ISubsidiaryRepository,
    ) {}

    public async execute(): Promise<Subsidiary[]> {
        const subsidiaries = await this.subsidiariesRepository.findSubsidiarysActive();

        return subsidiaries;
    }
}

export default ListSubsidiaryService;