import { Injectable } from '@angular/core';
import { JobEntity } from '../entity/jobs.entity';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { liveQuery } from 'dexie';
import { db } from '../db';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private api: ApiService) {}

  getJob(email: string, id: string): Observable<JobEntity> {
    return new Observable((subscriber: any) => {
      liveQuery(() =>
        db.jobs.get(`${email}/${id}`).then((job) => job?.data)
      ).subscribe((data) => subscriber.next(data));
    });
  }

  startUpdates(email: string) {
    this.api.startUpdates(email);
  }
}
