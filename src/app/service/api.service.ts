import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, delay, delayWhen, expand, reduce, tap } from 'rxjs';
import { ApiConfig, ApiFetchType, ApiPutType } from '../entity/api.entity';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { Params } from '@angular/router';
import {
  omitBy,
  isUndefined,
  isArrayLike,
  concat
} from 'lodash-es';
import { LoaderService } from './loader.service';
import { JobEntity } from '../entity/jobs.entity';
import { StorageService } from './storage.service';

interface CacheEntry {
  timestamp: moment.Moment;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  errorSubject = new Subject<string>();
  error = this.errorSubject.asObservable();
  uid = '';
  constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService,
    private storage: StorageService
  ) { }



  fetch(
    type: ApiFetchType,
    query: string = '',
    params: Params = {}
  ): Observable<any> {
    return new Observable((subscriber: any) => {
      let id = query;
      const path = [type, id].filter(x => x.length);
      const urlParams = new URLSearchParams(omitBy(params, isUndefined));
      urlParams.set("last_modified", this.storage.last_modified.toISOString());
      this.loaderService.show();
      this.httpClient
        .get(`${ApiConfig.BASE_URI}/${path.join("/")}`, {
          headers: { 'X-User-Token': this.storage.token },
          params: new HttpParams({ fromString: urlParams.toString() }),
          observe: 'response',
        })
        .pipe(
          // delayWhen(() => {

          // }),
          expand((res) => {
            const nextPage = res.headers.get('x-pagination-next');
            const pageNo = parseInt(String(res.headers.get('x-pagination-page')));
            return nextPage
              ? this.httpClient.get(nextPage, {
                headers: { 'X-User-Token': this.storage.token },
                observe: 'response',
              }).pipe(delay(100))
              : EMPTY;
          }),
          reduce((acc, current): any => {
            const data = current.body || {};
            const pageNo = parseInt(String(current.headers.get('x-pagination-page')));
            return isArrayLike(data) ? concat(acc, data) : data;
          }, []),
          tap((res) => {
            if (isArrayLike(res)) {
              const jobs = res as JobEntity[];
              this.storage.addJobs(jobs);
            } else {
              const job = res as JobEntity;
              this.storage.addJob(job);
            }
          })
        )
        .subscribe({
          next: (data: any) => {
            if (isArrayLike(data)) {
              this.storage.jobs.subscribe(data => subscriber.next(data));
            } else {
              this.storage.getJob(id).subscribe(data => subscriber.next(data));
            }
          },
          error: (error: any) => console.debug(error),
        });
    });
  }


  put(
    type: ApiPutType,
    payload: object = {}
  ): Observable<any> {
    return new Observable((subscriber: any) => {
      const path = [type];
      this.httpClient
        .put(`${ApiConfig.BASE_URI}/${path.join("/")}`, payload, {
          headers: { 'X-User-Token': this.storage.token },
        })
        .subscribe({
          next: (data: any) => {
            const job = data as JobEntity;
            this.storage.addJob(job).subscribe(() => subscriber.next(data));
          },
          error: (error: any) => console.debug(error),
        });
    });
  }

  // private toCache()

  // private cacheKey(type: ApiType): string {
  //   return SHA1(`${type}`).toString();
  // }

  // private inCache(key: string): any {
  //   const cached: string | null = localStorage.getItem(key);

  //   if (!cached) {
  //     return null;
  //   }

  //   const entry: CacheEntry = JSON.parse(cached);

  //   return entry.data;
  // }
}
