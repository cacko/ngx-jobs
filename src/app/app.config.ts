import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { ScreenTrackingService, UserTrackingService, getAnalytics, provideAnalytics } from '@angular/fire/analytics'
import { provideServiceWorker } from '@angular/service-worker';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideHttpClient } from '@angular/common/http';
import { provideNgxLocalstorage } from 'ngx-localstorage';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({
    projectId: 'jobs-c273f',
    appId: '1:889989614380:web:d411b3943ef7c5da637a89',
    storageBucket: 'jobs-c273f.appspot.com',
    apiKey: 'AIzaSyB64rCG0ZvQ8NWRDf_FHLxAL-0MY3hNPeU',
    authDomain: 'jobs-c273f.firebaseapp.com',
    messagingSenderId: '889989614380',
    measurementId: 'G-VHKD2CWXNY',
    databaseURL: 'https://jobs-c273f-default-rtdb.europe-west1.firebasedatabase.app/'
  })), provideAuth(() => getAuth()),
  provideAnalytics(() => getAnalytics()),
    ScreenTrackingService, UserTrackingService, provideDatabase(() => getDatabase()),

  provideHttpClient(),
  provideServiceWorker('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000'
  }),
  provideNgxLocalstorage({
    prefix: `jobs-${window.location.hostname}`
  })]
};

