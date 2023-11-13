import { CVEntity, ImageEntity } from '../entity/jobs.entity';

export class CVModel implements CVEntity {
  slug!: string;
  name!: string;
  image!: ImageEntity;

  constructor(original: Object) {
    Object.assign(this, original);
  }
}
