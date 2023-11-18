import { Injectable } from '@angular/core';
import {
  Auth,
  EmailAuthProvider,
  sendSignInLinkToEmail,
  authState,
  signInWithCredential,
  User,
  signOut,
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithEmailLink,
  isSignInWithEmailLink,
} from '@angular/fire/auth';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public readonly user: Observable<User | null> = EMPTY;

  constructor(private auth: Auth, private api: ApiService) {
    this.user = authState(this.auth);
  }

  init() {
    this.user.subscribe((res) => {
      res?.getIdToken().then((token) => {
        this.api.userToken = token;
      });
    });
    onAuthStateChanged(this.auth, (res) => {
      res?.getIdToken().then((token) => {
        this.api.userToken = token;
      });
    });
    onIdTokenChanged(this.auth, (res) => {
      console.log("on token changed");
      console.log("old token", this.api.userToken);
      res?.getIdToken().then((token) => {
        this.api.userToken = token;
        console.log("new token", token);
      });
    });
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
