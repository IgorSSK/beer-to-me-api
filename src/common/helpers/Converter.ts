import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import moment from 'moment';

const marshallConfig = {
	convertClassInstanceToMap: true,
	removeUndefinedValues: true
};

export const convertObjectToDynamo = (obj: any) => {
	Object.entries(obj).map(([key, value]) => {
		if (typeof value === 'object') convertObjectToDynamo(value);
		if (
			String(new Date(String(obj[key]))) !== 'Invalid Date' &&
			!isNaN(new Date(String(obj[key]))?.getTime()) &&
			typeof value !== 'number'
		) {
			obj[key] = (value as Date).toISOString();
		}
	});
	return marshall(obj, marshallConfig);
};

export const convertDynamoToObject = <T>(
	obj: { [key: string]: AttributeValue },
	chk: boolean = false
): T => {
	const parsed = !chk ? unmarshall(obj) : obj;
	Object.entries(parsed).map(([key, value]) => {
		if (typeof value === 'object') convertDynamoToObject(value, true);
		if (moment(value, moment.ISO_8601).isValid()) {
			parsed[key] = new Date(value);
		}
	});

	return parsed as T;
};

export type UploadObject = {
	name: string;
	object: Buffer;
	type: string;
};
export const convertBase64toUploadObject = (url: string, blobName: string): UploadObject | null => {
	try {
		const base64RegexExpression =
			/(?:[A-Za-z\d+/]{4})*(?:[A-Za-z\d+/]{3}=|[A-Za-z\d+/]{2}==)?/g;

		if (!new RegExp(base64RegexExpression).test(url)) return null;

		const [dataType, content] = url.replace('data:', '').replace('base64,', '').split(';');
		const contentBuffer = Buffer.from(content, 'base64');
		// const uint8Array = new Uint8Array(
		// 	response.buffer,
		// 	response.byteOffset,
		// 	response.byteLength / Uint8Array.BYTES_PER_ELEMENT
		// );

		return {
			name: blobName.replace(/ /g, '_').toLowerCase(),
			object: contentBuffer,
			type: dataType
		};
	} catch (error) {
		throw error;
	}
};
