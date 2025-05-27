import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { JobEntity } from '../entity/jobs.entity';
import { ApiService } from './api.service';
import { ApiFetchType } from '../entity/api.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private api: ApiService) { }

  getJob(id: string): Observable<JobEntity> {
    return this.api.fetch(ApiFetchType.JOB, id);
  }
}
