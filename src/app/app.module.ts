import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { NgxLongPress2Module } from 'ngx-long-press2';
import { LoginComponent } from './components/login/login.component';
import { LoaderComponent } from './components/loader/loader.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { MomentModule } from 'ngx-moment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from './service/api.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { JobComponent } from './components/job/job.component';
import { JoblocationComponent } from './components/joblocation/joblocation.component';
import { JobcvComponent } from './components/jobcv/jobcv.component';
import { JobcompanyComponent } from './components/jobcompany/jobcompany.component';
import { JobpositionComponent } from './components/jobposition/jobposition.component';
import { JobstatusComponent } from './components/jobstatus/jobstatus.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgPipesModule } from 'ngx-pipes';
import { LogoComponent } from './components/logo/logo.component';
import { MatStepperModule } from '@angular/material/stepper';
import { JoburlComponent } from './components/joburl/joburl.component';
import { JobsiteComponent } from './components/jobsite/jobsite.component';
import { JobsourceComponent } from './components/jobsource/jobsource.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimelineComponent } from './components/timeline/timeline.component';
import { JobdetailsComponent } from './components/jobdetails/jobdetails.component';
import { CvimageComponent } from './components/cvimage/cvimage.component';
import {
  remixFileExcel2Fill,
  remixLogoutCircleRLine,
  remixLinkedinBoxFill,
  remixLoginCircleLine,
} from '@ng-icons/remixicon';
import {
  lucideMailWarning,
  lucideKeyboard,
  lucideLink,
  lucideBuilding,
} from '@ng-icons/lucide';
import {
  typLink,
  typThumbsDown,
  typWatch,
  typFlash,
  typChevronLeftOutline,
  typEyeOutline,
  typFlag,
  typMicrophone,
  typMail,
  typDocumentText,
  typDelete
} from '@ng-icons/typicons';
import { NgIconsModule } from '@ng-icons/core';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CvViewComponent } from './components/cv-view/cv-view.component';
const MaterialModules = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatCardModule,
  MatTableModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatStepperModule,
  MatTooltipModule,
  MatRippleModule,
  MatButtonToggleModule,
];

const Icons = {
  lucideMailWarning,
  lucideKeyboard,
  lucideLink,
  typThumbsDown,
  typLink,
  typWatch,
  typFlash,
  remixFileExcel2Fill,
  remixLogoutCircleRLine,
  typChevronLeftOutline,
  lucideBuilding,
  remixLinkedinBoxFill,
  typFlag,
  typMicrophone,
  typMail,
  typDocumentText,
  remixLoginCircleLine,
  typEyeOutline,
  typDelete
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    JobsComponent,
    JobComponent,
    JoblocationComponent,
    JobcvComponent,
    JobcompanyComponent,
    JobpositionComponent,
    JobstatusComponent,
    LogoComponent,
    TimelineComponent,
    JobdetailsComponent,
    JoburlComponent,
    CvimageComponent,
    JobsourceComponent,
    CvViewComponent
  ],
  imports: [
    JobsiteComponent,
    BrowserModule,
    NgIconsModule.withIcons(Icons),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MomentModule,
    ReactiveFormsModule,
    FormsModule,
    NgPipesModule,
    NgxLongPress2Module,
    ...MaterialModules,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'jobs-c273f',
        appId: '1:889989614380:web:d411b3943ef7c5da637a89',
        storageBucket: 'jobs-c273f.appspot.com',
        apiKey: 'AIzaSyB64rCG0ZvQ8NWRDf_FHLxAL-0MY3hNPeU',
        authDomain: 'jobs-c273f.firebaseapp.com',
        messagingSenderId: '889989614380',
        measurementId: 'G-VHKD2CWXNY',
      })
    ),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiService,
      multi: true,
    },
    ScreenTrackingService,
    UserTrackingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
