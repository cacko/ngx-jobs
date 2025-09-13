import { inject, Injectable } from '@angular/core';
import {
  EMPTY,
  Observable,
  Subject,
  delay,
  expand,
  reduce,
  switchMap,
} from 'rxjs';
import { ApiConfig, ApiFetchType, ApiPutType, WSLoading } from '../entity/api.entity';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { omitBy, isUndefined, isArrayLike, concat } from 'lodash-es';
import { JobEntity } from '../entity/jobs.entity';
import { StorageService } from './storage.service';
import { Database, ref, DataSnapshot, onValue } from '@angular/fire/database';
import moment from 'moment';
import { addJobs, addJob, lastModified, setLastModified } from '../db';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  errorSubject = new Subject<string>();
  error = this.errorSubject.asObservable();
  uid = '';

  private updatesUnsub: (() => void) | null = null;
  private updatesEmail = '';

  constructor(
    private httpClient: HttpClient,
    private storage: StorageService,
    private db: Database = inject(Database)
  ) {}

  startUpdates(email: string) {
    if (this.updatesEmail === email) {
      return;
    }
    this.updatesEmail = email;
    this.updatesUnsub && this.updatesUnsub();
    const md5 = Md5.hashStr(email);
    const starCountRef = ref(this.db, `updates/${md5}`);
    this.updatesUnsub = onValue(starCountRef, (snapshot: DataSnapshot) => {
      const data = moment(snapshot.val() as string);
      lastModified(email).then((last_modified) => {
        if (data.isAfter(last_modified, 'minutes')) {
          this.fetch(ApiFetchType.JOBS, email).subscribe({
            next: (data: any) => {
              // console.log('Updated jobs fetched', data);
            },
            error: (error: any) => {
              console.debug(error);
            },
          });
        }
      });
    });
  }

  fetch(
    type: ApiFetchType,
    email: string,
    query: string = '',
    params: Params = {}
  ): Observable<any> {
    return new Observable((subscriber: any) => {
      lastModified(email).then((last_modified) => {
        let id = query;
        const path = [type, email, id].filter((x) => x.length);
        const urlParams = new URLSearchParams(omitBy(params, isUndefined));
        urlParams.set('last_modified', last_modified.toISOString());
        this.httpClient
          .get(`${ApiConfig.BASE_URI}/${path.join('/')}`, {
            headers: { 'X-User-Token': this.storage.token },
            params: new HttpParams({ fromString: urlParams.toString() }),
            observe: 'response',
          })
          .pipe(
            expand((res) => {
              const nextPage = res.headers.get('x-pagination-next');
              const pageNo = parseInt(
                String(res.headers.get('x-pagination-page'))
              );
              return nextPage
                ? this.httpClient
                    .get(nextPage, {
                      headers: { 'X-User-Token': this.storage.token },
                      observe: 'response',
                    })
                    .pipe(delay(100))
                : EMPTY;
            }),
            reduce((acc, current): any => {
              const data = current.body || {};
              const pageNo = parseInt(
                String(current.headers.get('x-pagination-page'))
              );
              return isArrayLike(data) ? concat(acc, data) : data;
            }, []),
            switchMap((res) => {
              if (isArrayLike(res)) {
                const jobs = res as JobEntity[];
                return Promise.all([addJobs(jobs), setLastModified(jobs)]);
              } else {
                const job = res as JobEntity;
                return Promise.all([addJob(job), setLastModified([job])]);
              }
            })
          )
          .subscribe({
            next: (data: any) => {
              subscriber.next(data);
            },
            error: (error: any) => subscriber.next(WSLoading.BLOCKING_OFF),
          });
      });
    });
  }

  put(type: ApiPutType, email: string, payload: object = {}): Observable<any> {
    return new Observable((subscriber: any) => {
      const path = [type, email];
      this.httpClient
        .put(`${ApiConfig.BASE_URI}/${path.join('/')}`, payload, {
          headers: { 'X-User-Token': this.storage.token },
        })
        .subscribe({
          next: (data: any) => {
            const job = data as JobEntity;
            addJob(job).then(() => subscriber.next(data));
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
