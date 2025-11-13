import { inject, injectable } from "tsyringe";

import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import IBuilderRepository from "../repositories/IBuilderRepository";

interface IRequestRepository {
 uf?: string;
}
interface IResponseDTO {
  link_url: string;
}


@injectable()
class ExportBuilderService {
  constructor(
    @inject('BuildersRepository')
    private buildersRepository: IBuilderRepository,

    @inject('StorageProvider')
    private storagePrivider: IStorageProvider,
  ) { }

  public async execute({uf}: IRequestRepository): Promise<IResponseDTO | undefined> {
    let builders = await this.buildersRepository.findBuildersActive({
      name: "",
      uf: uf || "",
      city: "",
    });

    const workSheetColumnNames = [
      { header: 'NOME', key: 'builder_name', width: 40 },
      { header: 'CNPJ', key: 'builder_cnpj', width: 40 },
      { header: 'E-MAIL', key: 'builder_email', width: 40 },
      { header: 'TELEFONE', key: 'builder_phone', width: 40 },
      { header: 'RESPONSÁVEL', key: 'builder_responsible', width: 40 },
      { header: 'ESTADO', key: 'builder_state', width: 40 },
      { header: 'CIDADE', key: 'builder_city', width: 40 },

    ]


    const data = builders.map((builder) => {
      const buildes = {
        builder_name: builder.name,
        builder_cnpj: builder.cnpj,
        builder_email: builder.email,
        builder_phone: builder.phone,
        builder_responsible: builder.responsible,
        builder_state: builder.state,
        builder_city: builder.city,
      }

      return buildes;
    });

    await this.storagePrivider.deleteFile('builders');

    const filePath = await this.storagePrivider.saveReportFile(
      {
        workSheetData: {
          headers: workSheetColumnNames,
          data: data
        },
        fileName: `builders-${new Date().getTime()}`,
        refCol: "A1:AF1"
      }
    );

    return {
      link_url: filePath
    };
  }
}

export default ExportBuilderService;
