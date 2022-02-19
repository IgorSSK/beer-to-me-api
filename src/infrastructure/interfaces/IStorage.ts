import {
	CreateBucketCommandOutput,
	GetObjectCommandOutput,
	ListBucketsCommandOutput,
	ListObjectsCommandOutput,
	PutObjectCommandOutput
} from '@aws-sdk/client-s3/dist-types/commands';
import { Readable } from 'stream';

export interface IStorage {
	getBuckets: () => Promise<ListBucketsCommandOutput>;
	getObjects: () => Promise<ListObjectsCommandOutput>;
	createBucket: () => Promise<CreateBucketCommandOutput>;
	createObject: (
		key: string,
		body: string | Readable | Blob | Uint8Array | Buffer,
		contentType?: string
	) => Promise<PutObjectCommandOutput>;
	getObject: (key: string) => Promise<GetObjectCommandOutput>;
}
