import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiType } from '../entity/api.entity';
import { JobEntity } from '../entity/jobs.entity';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private api: ApiService) { }

  getJobs(): any {
    return this.api.fetch(ApiType.JOBS);
  }

  getExport(): any {
    return  this.api.fetch(ApiType.JOBS_EXPORT);
  }
}

export const jobsResolver: ResolveFn<JobEntity[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(JobsService).getJobs();
};
