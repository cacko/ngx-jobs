import { SkillEntity, SkillGroup } from '../entity/jobs.entity';
import { DEVICONS } from '../entity/icons.entity';
import { SimpleIcon } from 'simple-icons';

export class SkillModel implements SkillEntity {
  group!: SkillGroup;
  name!: string;

  constructor(original: Object) {
    Object.assign(this, original);
  }

  get icon(): SimpleIcon | null {
    const iconName = Object.keys(DEVICONS).reduce(
      (res, lng) =>
        this.name.toLowerCase().indexOf(lng) > -1 ? lng : res,
      ''
    );
    return DEVICONS[iconName];
  }
}
