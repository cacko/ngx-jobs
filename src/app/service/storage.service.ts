import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  readonly KEY_HIDE_REJECTED = "hide_rejected";

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

  set hide_rejected(value: boolean) {
    this.store(value, this.KEY_HIDE_REJECTED);
  }

  get hide_rejected(): boolean {
    return this.fetch(this.KEY_HIDE_REJECTED, false);
  }


}
