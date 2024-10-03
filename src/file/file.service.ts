import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';
import { resolve } from "path"
import { config } from "dotenv"
config({ path: resolve("./.env") })


@Injectable()
export class FileService {
  private readonly s3: S3;

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      sessionToken:process.env.AWS_TOKEN
    });

    this.s3 = new AWS.S3();
  }

  async uploadFile(file:any): Promise<string> {
    const fileKey = `${uuidv4()}-${file.originalname}`;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    const uploadResult = await this.s3.upload(params).promise();
    return uploadResult.Location;
  }
}
