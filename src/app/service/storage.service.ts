import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { JobEntity } from '../entity/jobs.entity';
import { findIndex, find } from 'lodash-es';
import moment, { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  protected readonly storage = inject(LocalStorageService);


  readonly KEY_HIDE_EXPIRED = "hide_expired";
  readonly KEY_LAST_MODIFUED = "last_modified";
  readonly KEY_JOBS = "jobs";



  set hide_expired(value: boolean) {
    this.storage.set(this.KEY_HIDE_EXPIRED, value);
  }

  get hide_expired(): boolean {
    return this.storage.get(this.KEY_HIDE_EXPIRED) || false;
  }

  set last_modified(value: any) {
    this.storage.set(this.KEY_LAST_MODIFUED, value);
  }

  get last_modified(): moment.Moment {
    const res: string = this.storage.get(this.KEY_LAST_MODIFUED) || moment.unix(0).toISOString();
    return moment(res);
  }

  getJob(id: string): JobEntity | null {
    const jobs = this.jobs;
    return find(jobs, { id: id }) || null;
  }

  addJob(value: JobEntity) {
    const jobs = this.jobs;
    const idx = findIndex(jobs, { id: value.id });
    switch (idx) {
      case -1:
        jobs.push(value);
        break;
      default:
        jobs[idx] = value;
    }
    this.storage.set(this.KEY_JOBS, jobs);
  }

  addJobs(values: JobEntity[]) {
    const jobs = this.jobs;
    const newJobs = values.reduce((res: JobEntity[], job: JobEntity) => {
      const idx = findIndex(jobs, { id: job.id });
      switch (idx) {
        case -1:
          res.push(job);
          break;
        default:
          jobs[idx] = job;
      }
      return res;
    }, []);
    jobs.push(...newJobs);
    this.last_modified = moment.unix(Math.max(...jobs.map(j => moment(j.last_modified).unix()), this.last_modified.unix()));
    this.storage.set(this.KEY_JOBS, jobs);
  }

  get jobs(): JobEntity[] {
    return this.storage.get(this.KEY_JOBS) || [];
  }


}
