import { Moment } from 'moment';
import { find } from 'lodash-es';
import {
  CVEntity,
  CompanyEntity,
  JobEntity,
  JobEvent,
  JobEventEntity,
  JobStatus,
  LocationEntity,
  LocationType,
  Source,
} from '../entity/jobs.entity';
import { JobEventModel } from './jobEvent.model';
import * as moment from 'moment';
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
  events: JobEventModel[] = [];
  skills: SkillModel[] = [];

  constructor(original: Object) {
    Object.assign(this, original);
    this.last_modified = moment(this.last_modified);
    this.events = this.events.map((ev) => new JobEventModel(ev));
    this.skills = this.skills.map((sk) => new SkillModel(sk));
  }

  get applied(): JobEventEntity | undefined {
    return find(this.events, (ev) => ev.event == JobEvent.APPLIED);
  }
}
