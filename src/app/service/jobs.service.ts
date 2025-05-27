import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiFetchType } from '../entity/api.entity';
import { JobEntity } from '../entity/jobs.entity';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private api: ApiService) { }

  getJobs(): Observable<JobEntity[]> {
    return this.api.fetch(ApiFetchType.JOBS);
  }

  getExport(): any {
    return  this.api.fetch(ApiFetchType.JOBS_EXPORT);
  }
}
