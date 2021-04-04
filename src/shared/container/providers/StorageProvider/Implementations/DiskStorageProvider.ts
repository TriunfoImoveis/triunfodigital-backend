import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

import uploadConfig from '@config/upload';
import reportConfig from '@config/reports';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IRequestReportDTO from '@shared/container/providers/StorageProvider/dtos/IRequestReportDTO';

class DiskStorageProvider implements IStorageProvider {

  public async saveReportFile({workSheetData, fileName, refCol}: IRequestReportDTO): Promise<string> {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Equipe Triunfo Digital";
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet(fileName);
    worksheet.columns = workSheetData.headers;
    worksheet.addRows(workSheetData.data);
    worksheet.autoFilter = refCol ? refCol : undefined;

    const filePath = path.resolve(reportConfig.tmpFolder, `${fileName}.xlsx`);
    await workbook.xlsx.writeFile(filePath);
    
    return filePath;
  }

  public async saveFile(file: string): Promise<string> {
    path.resolve(uploadConfig.tmpFolder, file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
