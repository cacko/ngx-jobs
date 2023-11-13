import { LoaderService } from './service/loader.service';
import { Component, OnInit, isDevMode } from '@angular/core';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import {
  SwUpdate,
  VersionEvent,
  VersionReadyEvent,
} from '@angular/service-worker';
import { interval } from 'rxjs';
import { UserService } from './service/user.service';
import { User } from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading = false;
  user: User | null = null;
  useBackButton: boolean = false;

  constructor(
    private loaderService: LoaderService,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router

  ) {
    this.userService.user.subscribe((res) => {
      this.user = res;
    });
    this.userService.init();
  }
  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((evt: VersionEvent) => {
        if (evt.type == 'VERSION_READY') {
          this.snackBar
            .open('Update is available', 'Update')
            .onAction()
            .subscribe(() =>
              this.swUpdate
                .activateUpdate()
                .then(() => document.location.reload())
            );
        }
      });
      interval(10000).subscribe(() => {
        this.swUpdate.checkForUpdate();
      });
    }

    this.loaderService.visible.subscribe((res) => {
      this.loading = res;
    });

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.useBackButton = val.url !== "/";
      }
    })
  }

  logout() {
    this.userService.logout().then(() => this.router.navigateByUrl("/login"))
  }
}
