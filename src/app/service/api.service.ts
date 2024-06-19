import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, delay, expand, reduce } from 'rxjs';
import { ApiConfig, ApiType } from '../entity/api.entity';
import { HttpClient} from '@angular/common/http';
import * as moment from 'moment';
import { Params } from '@angular/router';
import {
  omitBy,
  isUndefined,
  isArrayLike,
  concat
} from 'lodash-es';
import { LoaderService } from './loader.service';

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
  userToken = '';
  constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService
  ) { }


  fetch(
    type: ApiType,
    query: string = '',
    params: Params = {}
  ): Observable<any> {
    return new Observable((subscriber: any) => {
      let id = query;
      const path = [type, id].filter(x => x.length);
      this.loaderService.show();
      this.httpClient
        .get(`${ApiConfig.BASE_URI}/${path.join("/")}`, {
          headers: { 'X-User-Token': this.userToken },
          params: omitBy(params, isUndefined),
          observe: 'response',
        })
        .pipe(
          expand((res) => {
            const nextPage = res.headers.get('x-pagination-next');
            const pageNo = parseInt(String(res.headers.get('x-pagination-page')));
            return nextPage
              ? this.httpClient.get(nextPage, {
                headers: { 'X-User-Token': this.userToken },
                observe: 'response',
              }).pipe(delay(pageNo * 200))
              : EMPTY;
          }),
          reduce((acc, current): any => {
            const data = current.body || {};
            const pageNo = parseInt(String(current.headers.get('x-pagination-page')));
            return isArrayLike(data) ? concat(acc, data) : data;
          }, [])
        )
        .subscribe({
          next: (data: any) => {
            subscriber.next(data);
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
