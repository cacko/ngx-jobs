import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { UserService } from 'src/app/service/user.service';
import { FirebaseError } from '@angular/fire/app';

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

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    public user: UserService
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
    this.activatedRoute.queryParams.subscribe((qp: any) => {
      this.redirectTo = qp.redirectTo || '/';
    });
  }

  logout() {
    this.user.logout();
  }

  onClick(ev: MouseEvent, mode: LOGIN_MODE) {
    ev.preventDefault();
    this.loginMode = mode;
    switch (mode) {
      case LOGIN_MODE.PASSWORD:
        return this.form.valid;
      case LOGIN_MODE.MAGIC:
        return false;
    }
  }
}
