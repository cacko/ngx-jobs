import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot,RouterStateSnapshot  } from '@angular/router';
import {
  AuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { LoginComponent } from './components/login/login.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { jobsResolver } from './service/jobs.service';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
// const redirectLoggedInToHome = () => redirectLoggedInTo(['w']);

/** add redirect URL to login */
const redirectUnauthorizedToLogin = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return redirectUnauthorizedTo(`/login?redirectTo=${state.url}`);
};

/** Uses the redirectTo query parameter if available to redirect logged in users, or defaults to '/' */
const redirectLoggedInToPreviousPage = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  let redirectUrl = '/';
  try {
    const redirectToUrl = new URL(state.url, location.origin);
    const params = new URLSearchParams(redirectToUrl.search);
    redirectUrl = params.get('redirectTo') || '/';
  } catch (err) {
    // invalid URL
  }
  return redirectLoggedInTo(redirectUrl);
};

const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
    pathMatch: 'full',
    resolve: {
      data: jobsResolver,
    },
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToPreviousPage },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
