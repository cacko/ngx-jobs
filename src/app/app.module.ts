import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"jobs-c273f","appId":"1:889989614380:web:d411b3943ef7c5da637a89","storageBucket":"jobs-c273f.appspot.com","apiKey":"AIzaSyB64rCG0ZvQ8NWRDf_FHLxAL-0MY3hNPeU","authDomain":"jobs-c273f.firebaseapp.com","messagingSenderId":"889989614380","measurementId":"G-VHKD2CWXNY"})),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics())
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
