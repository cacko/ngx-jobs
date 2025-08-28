import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { JobEntity } from '../entity/jobs.entity';
import moment, { Moment } from 'moment';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  protected readonly storage = inject(LocalStorageService);
  protected readonly iStorage = inject(NgxIndexedDBService);

  readonly KEY_HIDE_EXPIRED = 'hide_expired';
  readonly KEY_TOKEN = 'token';

  constructor() {
    // this.iStorage.count('job').subscribe((jobsCount) => {
    //   if (!jobsCount) {
    //     this.storage.remove(this.KEY_LAST_MODIFUED);
    //   }
    // });
  }

  set hide_expired(value: boolean) {
    this.storage.set(this.KEY_HIDE_EXPIRED, value);
  }

  get hide_expired(): boolean {
    return this.storage.get(this.KEY_HIDE_EXPIRED) || false;
  }

  setLastModified(email: string, value: any) {
    this.storage.set(email, value);
  }

  get token(): string {
    return this.storage.get(this.KEY_TOKEN) || '';
  }

  set token(value: any) {
    this.storage.set(this.KEY_TOKEN, value);
  }

  getLastModified(email: string): moment.Moment {
    const res: string = this.storage.get(email) || moment.unix(0).toISOString();
    return moment(res);
  }

  jobId(job: JobEntity) {
    return `${job.useremail}/${job.id}`;
  }

  getJob(id: string): Observable<JobEntity> {
    return this.iStorage.getByID('job', id).pipe(map((j: any) => j.data));
  }

  addJob(value: JobEntity) {
    return this.iStorage.update('job', {
      id: this.jobId(value),
      email: value.useremail,
      data: value,
    });
  }

  addJobs(values: JobEntity[]) {
    this.iStorage
      .bulkPut(
        'job',
        values.map((j) => ({ id: this.jobId(j), email: j.useremail, data: j }))
      )
      .subscribe((result) => {});
    
    values.length && this.setLastModified(
      values[0].useremail,
      moment.unix(
        Math.max(
          ...values.map((j) => moment(j.last_modified).unix()),
          this.getLastModified(values[0].useremail).unix()
        )
      )
    );
  }

  getJobs(email: string): Observable<JobEntity[]> {
    return this.iStorage
      .getAllByIndex('job', 'email', email)
      .pipe(map((data: any) => data.map((j: any) => j.data)));
  }
}
