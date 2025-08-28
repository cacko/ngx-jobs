import { Injectable } from '@angular/core';
import { ApiFetchType } from '../entity/api.entity';
import { JobEntity } from '../entity/jobs.entity';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private api: ApiService) { }

  getJobs(email: string): Observable<JobEntity[]> {
    return this.api.fetch(ApiFetchType.JOBS, email);
  }

  getExport(email: string): any {
    return  this.api.fetch(ApiFetchType.JOBS_EXPORT, email);
  }
}
