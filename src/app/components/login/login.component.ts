import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { UserService } from 'src/app/service/user.service';
import { FirebaseError } from '@angular/fire/app';
import { LoaderService } from 'src/app/service/loader.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

enum LOGIN_MODE {
  PASSWORD = 'password',
  MAGIC = 'magic',
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private redirectTo: string = '/';
  hide = true;
  form: FormGroup;
  emailInput = new FormControl('');
  passwordInput = new FormControl('');
  errorMessage: string | null = null;
  public loginMode?: LOGIN_MODE;
  public modeName = LOGIN_MODE;
  public waitForLink?: string;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    public user: UserService,
    private loader: LoaderService
  ) {
    this.form = this.builder.group({
      emailInput: this.emailInput,
      passwordInput: this.passwordInput,
    });
  }

  triggerSubmit($event: any) {
    if (this.form.valid) {
      this.submitForm();
    }
    return false;
  }

  submitForm() {
    const email = this.emailInput.value || '';
    const password = this.passwordInput.value || '';
    switch (this.loginMode) {
      case LOGIN_MODE.MAGIC:
        return this.sendEmailLink(email);
      case LOGIN_MODE.PASSWORD:
        return this.loginWithPassword(email, password);
    }
  }

  private sendEmailLink(email: string) {
    this.loader.show();
    this.user.getMagicLink(email).then(() => {
      this.waitForLink = email;
      this.loader.hide();
    });
  }

  private async loginWithEmailLink(email: string) {
    try {
      const user = await this.user.loginWithLink(email, window.location.href);
      this.router.navigateByUrl(this.redirectTo);
    } catch (err) {
      const error = err as FirebaseError;
      this.errorMessage = error.message;
    }
  }

  private loginWithPassword(email: string, password: string) {
    this.user
      .login(email, password)
      .then((user) => {
        this.router.navigateByUrl(this.redirectTo);
      })
      .catch((err: FirebaseError) => {
        this.errorMessage = err.message;
      });
  }

  ngOnInit(): void {
    this.loginMode = LOGIN_MODE.MAGIC;
    this.activatedRoute.queryParams.subscribe((qp: any) => {
      if (this.user.isEmailLinkSigning()) {
        console.debug('is signig');
        return this.loginWithEmailLink(qp.email);
      }
      this.redirectTo = qp.redirectTo || '/';
      return;
    });
  }

  logout() {
    this.user.logout();
  }

  onLoginMode(ev: MatButtonToggleChange) {
    this.loginMode = ev.value;
  }
}
