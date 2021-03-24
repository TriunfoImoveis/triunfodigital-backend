import IRequestReportDTO from "@shared/container/providers/StorageProvider/dtos/IRequestReportDTO";

export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
  saveReportFile(data: IRequestReportDTO): Promise<string>;
}
