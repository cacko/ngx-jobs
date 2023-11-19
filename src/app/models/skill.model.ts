import { SkillEntity, SkillGroup } from '../entity/jobs.entity';
import { DEVICONS } from '../entity/icons.entity';

export class SkillModel implements SkillEntity {
  group!: SkillGroup;
  name!: string;

  constructor(original: Object) {
    Object.assign(this, original);
  }

  get icon(): string {
    return Object.keys(DEVICONS).reduce(
      (res, lng) =>
        this.name.toLowerCase().indexOf(lng) > -1 ? DEVICONS[lng] : res,
      ''
    );
  }
}
