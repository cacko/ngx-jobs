import { LoaderService } from './service/loader.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { Observable, Subject, interval, map } from 'rxjs';
import { UserService } from './service/user.service';
import { User } from '@angular/fire/auth';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import {
  DEVICONS,
  StylesEntity,
  StyleObservers,
  StyleSubjects,
} from './entity/icons.entity';
import { AnimationService } from './service/animation.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { FlyingIconComponent } from './components/flying-icon/flying-icon.component';
import { LogoComponent } from './components/logo/logo.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgPipesModule } from 'ngx-pipes';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from './service/api.service';




@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        LoaderComponent,
        MatIconModule,
        FlyingIconComponent,
        RouterModule,
        LogoComponent,
        MatToolbarModule,
        NgPipesModule,
        MatButtonModule
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User | null = null;
  useBackButton: boolean = false;
  flyIcons = DEVICONS;
  title = 'geo';
  styleSubjects: StyleSubjects = {};
  styleObservers: StyleObservers = {};
  $isDesktop?: Observable<boolean>;

  constructor(
    private loaderService: LoaderService,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router,
    private animationService: AnimationService,
    private breakpoints: BreakpointObserver,
    private iconRegister: MatIconRegistry,
  ) {
    this.iconRegister.setDefaultFontSetClass('material-symbols-sharp');

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
      this.swUpdate.checkForUpdate();
    }

    this.$isDesktop = this.breakpoints
      .observe([Breakpoints.Large, Breakpoints.XLarge, Breakpoints.Medium])
      .pipe(map((state) => state.matches));

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

  @HostListener('window:blur')
  onBlur() {
    this.animationService.stop();
  }

  @HostListener('window:focus')
  onFocus() {
    this.animationService.resume();
  }
}
