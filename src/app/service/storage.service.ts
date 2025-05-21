import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { JobEntity } from '../entity/jobs.entity';
import { findIndex, find } from 'lodash-es';
import moment, { Moment } from 'moment';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  protected readonly storage = inject(LocalStorageService);
  protected readonly iStorage = inject(NgxIndexedDBService);


  readonly KEY_HIDE_EXPIRED = "hide_expired";
  readonly KEY_LAST_MODIFUED = "last_modified";
  readonly KEY_TOKEN = "token";

  constructor() {
    this.iStorage.count('job').subscribe((jobsCount) => {
      if (!jobsCount) {
        this.storage.remove(this.KEY_LAST_MODIFUED);
      }
    });
  }


  set hide_expired(value: boolean) {
    this.storage.set(this.KEY_HIDE_EXPIRED, value);
  }

  get hide_expired(): boolean {
    return this.storage.get(this.KEY_HIDE_EXPIRED) || false;
  }

  set last_modified(value: any) {
    this.storage.set(this.KEY_LAST_MODIFUED, value);
  }

  get token(): string {
    return this.storage.get(this.KEY_TOKEN) || '';
  }

  set token(value: any) {
    this.storage.set(this.KEY_TOKEN, value);
  }

  get last_modified(): moment.Moment {
    const res: string = this.storage.get(this.KEY_LAST_MODIFUED) || moment.unix(0).toISOString();
    return moment(res);
  }

  getJob(id: string): Observable<JobEntity> {
    return this.iStorage.getByID('job', id).pipe(map((j: any) => j.data));
  }

  addJob(value: JobEntity) {
    return this.iStorage.update('job', { id: value.id, data: value });
  }

  addJobs(values: JobEntity[]) {
    this.iStorage.bulkPut('job', values.map(j => ({ id: j.id, data: j }))).subscribe((result) => {
    });
    this.last_modified = moment.unix(Math.max(...values.map(j => moment(j.last_modified).unix()), this.last_modified.unix()));
  }

  get jobs(): Observable<JobEntity[]> {
    return this.iStorage.getAll('job').pipe(map((data: any) => data.map((j: any) => j.data)));
  }


}
