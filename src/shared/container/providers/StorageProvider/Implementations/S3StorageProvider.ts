import fs from 'fs';
import path from 'path';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import reportConfig from '@config/reports';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }
  public async saveReportFile(filePath: string): Promise<void> {
    const ContentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    if (!ContentType) {
      throw new Error('File not Found');
    }
    const fileContent = await fs.promises.readFile(filePath);

    await this.client
      .putObject({
        Bucket: reportConfig.config.aws.bucket,
        Key: 'sales',
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();
    
    await fs.promises.unlink(filePath);

    return undefined;
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
