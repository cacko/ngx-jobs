import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  readonly KEY_HIDE_EXPIRED = "hide_expired";

  private backgroundSrc ?: string


  constructor(

  ) { }

  private store(value: any, key: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private fetch(key: string, def: any = null): any {
    const data = localStorage.getItem(key);
    return data !== null ? JSON.parse(data) : def;
  }

  set hide_expired(value: boolean) {
    this.store(value, this.KEY_HIDE_EXPIRED);
  }

  get hide_expired(): boolean {
    return this.fetch(this.KEY_HIDE_EXPIRED, false);
  }


}
