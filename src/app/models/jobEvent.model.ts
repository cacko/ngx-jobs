import { JobEvent, JobEventEntity } from '../entity/jobs.entity';
import moment, { Moment } from 'moment';

export class JobEventModel implements JobEventEntity {
  event!: JobEvent;
  description!: string;
  timestamp !: moment.Moment;
  constructor(original: Object) {
    Object.assign(this, original);
    this.timestamp = moment(this.timestamp);
    this.description = this.description.replace(/[\r\n]{3,}/g, "\n");

  }
}
