import { WorkBook } from 'xlsx';

export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
  saveReportFile(workBook: WorkBook): Promise<void>;
}
