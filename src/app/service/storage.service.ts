import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  protected readonly storage = inject(LocalStorageService);

  readonly KEY_HIDE_EXPIRED = 'hide_expired';
  readonly KEY_TOKEN = 'token';

  constructor() {
  }

  set hide_expired(value: boolean) {
    this.storage.set(this.KEY_HIDE_EXPIRED, value);
  }

  get hide_expired(): boolean {
    return this.storage.get(this.KEY_HIDE_EXPIRED) || false;
  }


  get token(): string {
    return this.storage.get(this.KEY_TOKEN) || '';
  }

  set token(value: any) {
    this.storage.set(this.KEY_TOKEN, value);
  }
}
