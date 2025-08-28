import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { UserService } from 'src/app/service/user.service';
import { FirebaseError } from '@angular/fire/app';
import { LoaderService } from 'src/app/service/loader.service';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LogoComponent } from '../logo/logo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SimpleIconComponent } from '../simple-icon/simple-icon.component';
import { siGoogle } from 'simple-icons';

enum LOGIN_MODE {
  PASSWORD = 'password',
  MAGIC = 'magic',
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    LogoComponent,
    MatButtonModule,
    MatInputModule,
    SimpleIconComponent
  ],
})
export class LoginComponent implements OnInit {
  private redirectTo: string = '/';
  hide = true;
  errorMessage: string | null = null;
  excelIcon = siGoogle;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public user: UserService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.loader.hide();
    this.activatedRoute.queryParams.subscribe((qp: any) => {
      this.redirectTo = qp.redirectTo || '/';
      return;
    });
  }

  private injectEmail(path: string, email: string) {
    const parts = path.split('/');
    if (parts[0].indexOf('@') === -1) {
      parts.unshift(email);
    }
    return parts.join("/");
  }

  loginWithGoogle() {
    this.loader.show();
    this.user
      .loginWithGoogle()
      .then((user) => {
        this.router.navigateByUrl(this.redirectTo);
      })
      .catch((err: FirebaseError) => {
        this.errorMessage = err.message;
      });
  }

  logout() {
    this.user.logout();
  }
}
