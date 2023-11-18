import { LoaderService } from './service/loader.service';
import { Component, OnInit, isDevMode } from '@angular/core';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import {
  SwUpdate,
  VersionEvent,
  VersionReadyEvent,
} from '@angular/service-worker';
import { Subject, interval } from 'rxjs';
import { UserService } from './service/user.service';
import { User } from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';
import {
  DEVICONS,
  StylesEntity,
  StyleObservers,
  StyleSubjects,
} from './entity/icons.entity';
import { AnimationService } from './service/animation.service';
import { random } from 'lodash-es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading = false;
  user: User | null = null;
  useBackButton: boolean = false;
  flyIcons = DEVICONS;
  title = 'geo';
  styleSubjects: StyleSubjects = {};
  styleObservers: StyleObservers = {};

  constructor(
    private loaderService: LoaderService,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router,
    private animationService: AnimationService
  ) {
    this.userService.user.subscribe((res) => {
      this.user = res;
    });
    this.userService.init();
    Object.keys(DEVICONS).forEach((id) => {
      this.styleSubjects[id] = new Subject<StylesEntity>();
      this.styleObservers[id] = this.getStyleSubject(id).asObservable();
    });
  }
  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((evt: VersionEvent) => {
        if (evt.type == 'VERSION_READY') {
          this.snackBar
            .open('Update is available', 'Update', { duration: 15000 })
            .afterDismissed()
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
        this.useBackButton = val.url !== '/';
      }
    });
    this.loaderService.show();
    this.animationService.start();
  }

  getStyleSubject(id: string) {
    return this.styleSubjects[id];
  }

  getStyleObserver(id: string) {
    return this.styleObservers[id];
  }

  logout() {
    this.userService.logout().then(() => this.router.navigateByUrl('/login'));
  }
}
