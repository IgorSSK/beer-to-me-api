import { generateUUID } from '@common/helpers/UUID';
import Comment from './Comment';
import Confiability from './Confiability';
import Estabelishment from './Estabelishment';
import Product from './Product';

class Publishment {
	public id: string;
	public price: number;
	public condition: any;
	public createdAt?: Date;
	public updatedAt?: Date;
	public confiability: Confiability;
	public estabelishment: Estabelishment;
	public product: Product;
	public comments: Comment[];

	constructor(publishment?: Publishment) {
		if (!publishment) {
			this.id = generateUUID();
			this.confiability = new Confiability();
			this.createdAt = new Date();
		} else {
			Object.assign(this, publishment);
			this.updatedAt = new Date();
		}
	}

	public voteConfiability(confiability: number): void {
		const avarage =
			(this.confiability.avarage * this.confiability.count + confiability) /
			(this.confiability.count + 1);

		this.confiability.avarage = Math.floor(avarage);
		this.confiability.count++;
	}
}

export default Publishment;
