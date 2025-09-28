import { Injectable } from '@angular/core';
import { JobEntity } from '../entity/jobs.entity';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { liveQuery } from 'dexie';
import { db } from '../db';
import { ApiFetchType, WSLoading } from '../entity/api.entity';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private api: ApiService) {}

  getJob(email: string, id: string): Observable<WSLoading | JobEntity> {
    return new Observable((subscriber: any) => {
      subscriber.next(WSLoading.BLOCKING_ON);
      this.api.fetch(ApiFetchType.JOBS, email).subscribe({
        next: (data: any) => {
          subscriber.next(WSLoading.BLOCKING_OFF);
        },
      });
      liveQuery(() =>
        db.jobs.get(`${email}/${id}`).then((job) => job?.data)
      ).subscribe((data) => subscriber.next(data));
    });
  }

  startUpdates(email: string) {
    this.api.startUpdates(email);
  }
}
