import { Moment } from 'moment';
import { find } from 'lodash-es';
import {
  CVEntity,
  JobEntity,
  JobEvent,
  JobEventEntity,
  JobStatus,
  LocationEntity,
  LocationType,
  Source,
} from '../entity/jobs.entity';

export class JobModel implements JobEntity {
  position!: string;
  company!: string;
  id!: string;
  last_modified!: Moment;
  cv!: CVEntity;
  deleted!: boolean;
  status!: JobStatus;
  location!: LocationEntity;
  onsite!: LocationType;
  source!: Source;
  events: JobEventEntity[] = [];

  constructor(original: Object) {
    Object.assign(this, original);
  }

  get applied(): JobEventEntity | undefined {
    return find(this.events, (ev) => ev.event == JobEvent.APPLIED);
  }
}