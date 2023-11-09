import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { ApiService } from 'src/app/service/api.service';
import { UserService } from 'src/app/service/user.service';
import { FirebaseError } from '@angular/fire/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  private redirectTo: string = "/";
  hide = true;
  form: FormGroup;
  emailInput = new FormControl('');
  passwordInput = new FormControl('');
  errorMessage: string | null = null;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    public user: UserService
  ) {

    this.form = this.builder.group({
      emailInput: this.emailInput,
      passwordInput: this.passwordInput
    })

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
    this.user.login(email, password).then((user) => {
      this.router.navigateByUrl(this.redirectTo);
    }).catch((err: FirebaseError) => {
      this.errorMessage = err.message;
    });
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((qp: any) => {
      this.redirectTo = qp.redirectTo || "/";
    })
  }


  logout() {
    this.user.logout();
  }
}
