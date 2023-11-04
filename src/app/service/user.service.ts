import { Injectable } from '@angular/core';
import { Auth, EmailAuthProvider, UserCredential, authState, signInWithCredential, User, signOut } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public readonly user: Observable<User | null> = EMPTY;

  constructor(
    private auth: Auth
  ) {
    this.user = authState(this.auth);
  }

  async login(email: string, password: string) {
      const authCredential = EmailAuthProvider.credential(email, password);
      return await signInWithCredential(this.auth, authCredential);
  }

  async logout() {
    return await signOut(this.auth);
  }
}
