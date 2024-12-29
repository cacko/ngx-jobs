import { CoverLetterEntity, ImageEntity } from '../entity/jobs.entity';

export class CoverLetterModel implements CoverLetterEntity {
  slug!: string;
  name!: string;
  image!: ImageEntity;

  constructor(original: Object) {
    Object.assign(this, original);
  }
}
