import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { JobEntity } from '../entity/jobs.entity';
import { ApiService } from './api.service';
import { ApiFetchType } from '../entity/api.entity';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private api: ApiService) { }

  getJob(id: string): any {
    return this.api.fetch(ApiFetchType.JOB, id);
  }
}


export const jobResolver: ResolveFn<JobEntity[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = route.paramMap.get('id')!;
  return inject(JobService).getJob(id);
};
