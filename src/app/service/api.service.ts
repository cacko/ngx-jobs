import { Injectable } from '@angular/core';
import { Observable, Subject, of, tap } from 'rxjs';
import { ApiConfig, ApiType, WSLoading } from '../entity/api.entity';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import * as moment from 'moment';
import { Params } from '@angular/router';
import {
  omitBy,
  orderBy,
  head,
  isObject,
  findIndex,
  isArray,
  filter,
  map,
  isUndefined,
  isNumber,
  find,
} from 'lodash-es';
import { LoaderService } from './loader.service';

interface CacheEntry {
  timestamp: moment.Moment;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService implements HttpInterceptor {
  errorSubject = new Subject<string>();
  error = this.errorSubject.asObservable();
  userToken = '';
  constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.onEnd();
          }
        },
        (err: HttpErrorResponse) => {
          this.onEnd();
          this.errorSubject.next(err.message);
        }
      )
    );
  }
  private onEnd(): void {
    this.loaderService.hide();
  }

  fetch(
    type: ApiType,
    query: string = '',
    params: Params = {}
  ): Observable<any> {
    return new Observable((subscriber: any) => {
      let id = query;
      this.httpClient
        .get(`${ApiConfig.BASE_URI}/${type}/${id}`, {
          headers: { 'X-User-Token': this.userToken },
          params: omitBy(params, isUndefined),
        })
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
