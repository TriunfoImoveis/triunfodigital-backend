import fs from 'fs';
import path from 'path';
import mime from 'mime';
import ExcelJS from 'exceljs';
import aws, { S3 } from 'aws-sdk';

import uploadConfig from '@config/upload';
import reportConfig from '@config/reports';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IRequestReportDTO from '@shared/container/providers/StorageProvider/dtos/IRequestReportDTO';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveReportFile({workSheetData, fileName, refCol}: IRequestReportDTO): Promise<string> {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Equipe Triunfo Digital";
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet(fileName);
    worksheet.columns = workSheetData.headers;
    worksheet.getRow(1).font = {bold: true};
    worksheet.addRows(workSheetData.data);
    worksheet.autoFilter = refCol ? refCol : undefined;

    const filePath = path.resolve(reportConfig.tmpFolder, `${fileName}.xlsx`);
    await workbook.xlsx.writeFile(filePath);

    const ContentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    if (!ContentType) {
      throw new Error('File not Found');
    }
    const fileContent = await fs.promises.readFile(filePath);

    await this.client
      .putObject({
        Bucket: reportConfig.config.aws.bucket,
        Key: fileName,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();
    
    await fs.promises.unlink(filePath);

    return `https://${reportConfig.config.aws.bucket}.s3.amazonaws.com/${fileName}`;
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not Found');
    }
    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}



export default S3StorageProvider;
