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
			!isNaN(new Date(String(obj[key]))?.getTime())
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

export const convertBase64toBlob = async (url: string, blobName: string) => {
	try {
		const response = await fetch(url);

		return response;
	} catch (error) {
		throw error;
	}
};
