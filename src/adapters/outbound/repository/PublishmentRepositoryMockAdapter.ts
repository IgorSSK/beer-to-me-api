import Publishment from '@application/domain/entities/Publishment';

class PublishmentRepositoryMockAdapter {
	private _publishments: Publishment[];
	constructor() {
		this._publishments = [];
		// this._publishments.push({
		// 	id: '16c7c5e67c644db690ad2c80319a2545',
		// 	price: 8,
		// 	condition: '',
		// 	estabelishment: {
		// 		address: 'Avenida Manancial, 7882, Jardins, Itaporã-PA',
		// 		image: '',
		// 		name: "Maravilha's Bar"
		// 	},
		// 	product: {
		// 		brand: 'Skol Beats'
		// 	},
		// 	confiability: { avarage: 85, count: 2 },
		// 	createdAt: new Date(1642084809313),
		// 	updatedAt: new Date(1642184809313),
		// 	comments: [
		// 		{
		// 			author: 'Péricles',
		// 			dateTime: new Date(1642484809313),
		// 			text: 'Gelada pra caramba!'
		// 		}
		// 	]
		// });
	}

	async create(obj: Publishment): Promise<void> {
		this._publishments.push(obj);
		return;
	}

	async findAll(): Promise<Publishment[]> {
		return this._publishments;
	}

	async findById(id: any): Promise<Publishment | undefined> {
		return this._publishments.find(publishment => publishment.id === id);
	}

	async update(obj: Publishment): Promise<void> {
		throw new Error('Method not implemented.' + obj);
	}

	async delete(id: any): Promise<void> {
		throw new Error('Method not implemented.' + id);
	}
}

export default PublishmentRepositoryMockAdapter;
