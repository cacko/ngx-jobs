import { Injectable } from '@angular/core';
import {
  Auth,
  EmailAuthProvider,
  sendSignInLinkToEmail,
  authState,
  signInWithCredential,
  User,
  signOut,
  signInWithEmailLink,
  isSignInWithEmailLink,
  onIdTokenChanged
} from '@angular/fire/auth';
import { EMPTY, Observable, Subscription, timer } from 'rxjs';
import { ApiService } from './api.service';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  public readonly user: Observable<User | null> = EMPTY;
  private refreshSub ?: Subscription;

  constructor(private auth: Auth, private api: ApiService) {
    this.user = authState(this.auth);
  }

  init() {
    // this.user.subscribe((res) => {
    //   console.debug("user sign in");
    // });
    onIdTokenChanged(this.auth, (res) => {
      res?.getIdTokenResult().then((tokenResult) => {
        console.debug(tokenResult);
        this.api.userToken = tokenResult.token;
        const expiry = moment(tokenResult.expirationTime);
        const refresh = expiry.subtract(5 * 60, 'seconds')
        this.refreshSub && this.refreshSub?.unsubscribe();
        this.refreshSub = timer(refresh.toDate()).subscribe(() => {
          console.debug("schedule token refresh");
          res.getIdToken(true);
        });
      });
    })
  }

  async login(email: string, password: string) {
    const authCredential = EmailAuthProvider.credential(email, password);
    console.debug(email, password);
    return await signInWithCredential(this.auth, authCredential);
  }

  getMagicLink(email: string) {
    const actionCodeSettings = {
      url: `${window.location.origin}/login?email=${email}`,
      handleCodeInApp: true,
    };
    return sendSignInLinkToEmail(this.auth, email, actionCodeSettings);
  }

  async loginWithLink(email: string, link: string)  {
    return await signInWithEmailLink(this.auth, email, link);
  }

  async logout() {
    return await signOut(this.auth);
  }

  isEmailLinkSigning() {
    return isSignInWithEmailLink(this.auth, window.location.href);
  }
}
