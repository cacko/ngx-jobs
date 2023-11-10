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
} from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
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
  }

  async login(email: string, password: string) {
    const authCredential = EmailAuthProvider.credential(email, password);
    return await signInWithCredential(this.auth, authCredential);
  }

  async getMagicLink(email: string) {
    // return await sendSignInLinkToEmail(this.auth, email, );
  }

  async logout() {
    return await signOut(this.auth);
  }
}
