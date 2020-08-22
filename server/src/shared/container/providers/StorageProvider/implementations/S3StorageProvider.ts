import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      accessKeyId: process.env.AWS_ACESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const filePath = path.resolve(uploadConfig.tmpFolder, file);
    const fileContent = await fs.promises.readFile(filePath);
    const fileType = mime.getType(file);

    if (!fileType) {
      throw new AppError('Invalid File Type');
    }

    await this.client
      .putObject({
        Bucket: 'barbetto-profile-pics',
        Key: file,
        ACL: 'public-read',
        ContentType: fileType,
        Body: fileContent,
      })
      .promise();

    await fs.promises.unlink(filePath);

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
