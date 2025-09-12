import { Injectable } from '@angular/core';
import { ApiFetchType, WSLoading } from '../entity/api.entity';
import { JobEntity } from '../entity/jobs.entity';
import { ApiService } from './api.service';
import { Observable, switchMap, tap } from 'rxjs';
import { liveQuery } from 'dexie';
import { db } from '../db';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private api: ApiService, private loader: LoaderService) {}

  getJobs(email: string): Observable<JobEntity[]|WSLoading> {
    return new Observable((subscriber: any) => {
      subscriber.next(WSLoading.BLOCKING_ON)
      this.api.fetch(ApiFetchType.JOBS, email).subscribe({
        next: (data: any) => {
          subscriber.next(WSLoading.BLOCKING_OFF);
        },
      });
      liveQuery(() =>
        db.jobs
          .where({
            email: email,
          })
          .toArray()
          .then((jobs) => jobs.map((j) => j.data))
      ).subscribe((data: JobEntity[]) => subscriber.next(data));
    });
  }

  startUpdates(email: string) {
    this.api.startUpdates(email);
  }

  getExport(email: string): any {
    return this.api.fetch(ApiFetchType.JOBS_EXPORT, email);
  }
}
