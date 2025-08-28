import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  User,
  signOut,
  onIdTokenChanged
} from '@angular/fire/auth';
import {
  GoogleAuthProvider,
  signInWithPopup
} from '@angular/fire/auth';
import { EMPTY, Observable, Subscription, timer } from 'rxjs';
import moment, { Moment } from 'moment';
import { StorageService } from './storage.service';
import { JobModel } from '../models/jobs.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  public readonly user: Observable<User | null> = EMPTY;
  private userData: User | null = null;
  private refreshSub?: Subscription;


  constructor(
    private auth: Auth,
    private storage: StorageService
  ) {
    this.user = authState(this.auth);

  }

  private initToken(res: User | null) {
    this.userData = res;
    res?.getIdTokenResult().then((tokenResult) => {
      this.storage.token = tokenResult.token;
      const expiry = moment(tokenResult.expirationTime);
      const refresh = expiry.subtract(5 * 60, 'seconds')
      this.refreshSub && this.refreshSub?.unsubscribe();
      this.refreshSub = timer(refresh.toDate()).subscribe(() => {
        res.getIdToken(true);
      });
    });
  }

  init() {
    onIdTokenChanged(this.auth, (res) => {
      this.initToken(res);
    })
  }

  isOwner(job: JobModel): boolean {
    return this.userData?.email === job.useremail;
  }


  async loginWithGoogle() {
      const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return await signInWithPopup(this.auth, provider);
  }



  async logout() {
    return await signOut(this.auth);
  }
}
