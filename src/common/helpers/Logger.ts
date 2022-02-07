import moment from 'moment';

export default class Logger {
	private static readonly _prefix = `[${moment(new Date()).format('DD/MM/YYYY HH:mm:ss')}]`;

	static info(message: string, obj?: any): void {
		console.info(
			`${this._prefix}[INFO] >>>  ${message}${obj ? JSON.stringify(obj, null, 2) : ''}`
		);
	}

	static error(message: string, error: object): void {
		console.error(`${this._prefix}[ERROR] >>> ${message} | ${JSON.stringify(error, null, 2)} `);
	}

	static start(): number {
		const startTime = new Date();
		console.log('____________________________________________________________________________');
		console.log(`   STARTED AT:  ${String(startTime)}`);
		console.log('____________________________________________________________________________');

		return startTime.getTime();
	}

	static end(pintpoint: number) {
		const endTime = new Date();
		console.log('____________________________________________________________________________');
		console.log(`   ENDED AT:  ${String(endTime)} `);
		console.log(`   ELAPSED TIME:  ${endTime.getTime() - pintpoint} ms `);
		console.log('____________________________________________________________________________');
	}
}
