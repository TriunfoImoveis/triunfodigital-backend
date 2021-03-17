import fs from 'fs';
import path from 'path';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import reportConfig from '@config/reports';
import IStorageProvider from '../models/IStorageProvider';
import xlsx, { WorkBook } from 'xlsx';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }
  public async saveReportFile(workBook: WorkBook): Promise<void> {
    new Promise((resolve, reject) => {
      resolve(
        xlsx.writeFile(
          workBook,
          path.resolve(
            reportConfig.tmpFolder,
            'sales.xlsx'
          )
        )
      )
      reject('error');
    });

    const originalPath = path.resolve(reportConfig.tmpFolder, 'sales.xlsx');

    const ContentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    if (!ContentType) {
      throw new Error('File not Found');
    }
    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: reportConfig.config.aws.bucket,
        Key: 'sale',
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
    return;
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
