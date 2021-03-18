
export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
  saveReportFile(filePath: string): Promise<void>;
}
