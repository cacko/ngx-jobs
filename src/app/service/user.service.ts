import { inject, Injectable } from '@angular/core';
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
import { BehaviorSubject, EMPTY, Observable, Subscription, tap, timer } from 'rxjs';
import { ApiService } from './api.service';
import moment, { Moment } from 'moment';
import { Database, objectVal, ref } from '@angular/fire/database';
import { Admins } from '../entity/api.entity';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  public readonly user: Observable<User | null> = EMPTY;
  private userData: User | null = null;
  private refreshSub?: Subscription;

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public readonly $isAdmin = this.isAdminSubject.asObservable();

  private admins: Admins = {};

  constructor(
    private auth: Auth,
    private storage: StorageService,
    private db: Database = inject(Database)
  ) {
    this.user = authState(this.auth).pipe(
      tap((res) => {
        if (res) {
          const path = `access/admin`;
          const accessRef = ref(this.db, path);
          objectVal(accessRef).subscribe({
            next: (data: any) => {
              this.admins = (data || {}) as Admins;
              this.updateAdmin();
            }
          });
        }
      })
    );

  }

  private initToken(res: User | null) {
    this.userData = res;
    this.updateAdmin();
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

  async login(email: string, password: string) {
    const authCredential = EmailAuthProvider.credential(email, password);
    return await signInWithCredential(this.auth, authCredential);
  }

  getMagicLink(email: string) {
    const actionCodeSettings = {
      url: `${window.location.origin}/login?email=${email}`,
      handleCodeInApp: true,
    };
    return sendSignInLinkToEmail(this.auth, email, actionCodeSettings);
  }

  async loginWithLink(email: string, link: string) {
    return await signInWithEmailLink(this.auth, email, link);
  }

  async logout() {
    return await signOut(this.auth);
  }

  isEmailLinkSigning() {
    return isSignInWithEmailLink(this.auth, window.location.href);
  }

  private updateAdmin() {
    this.isAdminSubject.next((this.userData?.uid || "") in this.admins)
  }
}
