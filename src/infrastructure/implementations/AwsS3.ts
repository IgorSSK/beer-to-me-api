import {
	S3Client,
	ListBucketsCommand,
	CreateBucketCommand,
	PutObjectCommand,
	GetObjectCommand,
	ListObjectsCommand,
	ListBucketsCommandOutput,
	CreateBucketCommandOutput,
	GetObjectCommandOutput,
	ListObjectsCommandOutput,
	PutObjectCommandOutput
} from '@aws-sdk/client-s3';
import { IStorage } from '@infrastructure/interfaces/IStorage';
import { Readable } from 'stream';

export class AwsS3 implements IStorage {
	private client: S3Client;
	private bucketName: string;

	constructor(bucketName: string) {
		this.client = new S3Client({});
		this.bucketName = bucketName;
	}

	async getBuckets(): Promise<ListBucketsCommandOutput> {
		try {
			const command = new ListBucketsCommand({});
			return await this.client.send(command);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async getObjects(): Promise<ListObjectsCommandOutput> {
		try {
			const command = new ListObjectsCommand({ Bucket: this.bucketName });
			return await this.client.send(command);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async createBucket(): Promise<CreateBucketCommandOutput> {
		try {
			const command = new CreateBucketCommand({ Bucket: this.bucketName });
			return await this.client.send(command);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async createObject(
		key: string,
		body: string | Readable | Blob | Uint8Array | Buffer,
		contentType?: string | undefined
	): Promise<PutObjectCommandOutput> {
		try {
			const buckets = await this.getBuckets();

			if (!buckets.Buckets?.find(bucket => bucket.Name === this.bucketName)) {
				this.createBucket();
			}

			const command = new PutObjectCommand({
				Bucket: this.bucketName,
				Key: key,
				Body: body,
				ContentType: contentType,
				ContentEncoding: 'base64',
				ACL: 'public-read'
			});
			return await this.client.send(command);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async getObject(key: string): Promise<GetObjectCommandOutput> {
		try {
			const command = new GetObjectCommand({ Bucket: this.bucketName, Key: key });
			return await this.client.send(command);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
