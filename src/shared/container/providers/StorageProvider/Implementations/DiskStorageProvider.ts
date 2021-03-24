import fs from 'fs';
import path from 'path';
import * as xlsx from 'xlsx';

import uploadConfig from '@config/upload';
import reportConfig from '@config/reports';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IRequestReportDTO from '@shared/container/providers/StorageProvider/dtos/IRequestReportDTO';

class DiskStorageProvider implements IStorageProvider {

  public async saveReportFile({workSheetData, fileName, refCol}: IRequestReportDTO): Promise<string> {
    const filePath = path.resolve(reportConfig.tmpFolder, `${fileName}.xlsx`);

    const workBook = xlsx.utils.book_new();
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    if (refCol) {
      workSheet["!autofilter"] = {ref: refCol};
    }

    xlsx.utils.book_append_sheet(workBook, workSheet, fileName);
    xlsx.writeFile(
      workBook,
      filePath
    );
    
    return path.resolve(reportConfig.tmpFolder, `${fileName}.xlsx`);
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
