import { find, head } from 'lodash-es';
import {
  CVEntity,
  CompanyEntity,
  CoverLetterEntity,
  JobEntity,
  JobEvent,
  JobEventEntity,
  JobStatus,
  LocationEntity,
  LocationType,
  SkillGroup,
  Source,
} from '../entity/jobs.entity';
import { JobEventModel } from './jobEvent.model';
import moment, { Moment } from 'moment';
import { SkillModel } from './skill.model';

export class JobModel implements JobEntity {
  position!: string;
  company!: CompanyEntity;
  id!: string;
  last_modified!: Moment;
  cv!: CVEntity;
  deleted!: boolean;
  status!: JobStatus;
  location!: LocationEntity;
  onsite!: LocationType;
  source!: Source;
  url!: string;
  cover_letter?: CoverLetterEntity | undefined;
  events: JobEventModel[] = [];
  skills: SkillModel[] = [];
  useremail!: string;
  
  constructor(original: Object) {
    Object.assign(this, original);
    this.events = this.events
      .map((ev) => new JobEventModel(ev))
      .sort((a, b) => b.timestamp.diff(a.timestamp));
    this.skills = this.skills
      .filter((sk) =>
        [SkillGroup.TECHNICAL, SkillGroup.TECHNOLOGY].includes(sk.group)
      )
      .map((sk) => new SkillModel(sk));
    this.last_modified = moment(
      find(this.events, (o) => o.event != JobEvent.EXPIRED)?.timestamp
    );
  }


  get applied(): JobEventEntity {
    return find(this.events, (ev) => ev.event == JobEvent.APPLIED) as JobEventEntity;
  }

  filter(words: string[]): boolean {
    return words.length === 0  || (
      words.filter(
        (w) =>
          [this.company.name, this.position].join(' ').toLowerCase().indexOf(w) > -1
      ).length > 0
    );
  }
}
