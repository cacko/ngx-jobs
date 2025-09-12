import { Injectable } from '@angular/core';
import { ApiFetchType } from '../entity/api.entity';
import { JobEntity } from '../entity/jobs.entity';
import { ApiService } from './api.service';
import { Observable, switchMap } from 'rxjs';
import { liveQuery } from 'dexie';
import { db } from '../db';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private api: ApiService) {}

  getJobs(email: string): Observable<JobEntity[]> {
    return new Observable((subscriber: any) => {
      liveQuery(() =>
        db.jobs
          .where({
            email: email,
          })
          .toArray()
          .then((jobs) => jobs.map((j) => j.data))
      ).subscribe((data) => subscriber.next(data));
    });
  }

  startUpdates(uuid: string, email: string = '') {
    this.api.startUpdates(uuid, email);
  }

  getExport(email: string): any {
    return this.api.fetch(ApiFetchType.JOBS_EXPORT, email);
  }
}
