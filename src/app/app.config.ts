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
import { provideIndexedDb, DBConfig } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'jobs',
  version: 1,
  objectStoresMeta: [{
    store: 'job',
    storeConfig: { keyPath: 'id', autoIncrement: false },
    storeSchema: [
      { name: 'data', keypath: 'data', options: { unique: false } },
    ]
  }]
};


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({
    apiKey: "AIzaSyAS4QJu9n_Ugu6At-kJwANyhAjDGTZL_P8",
    authDomain: "jobs-c273f.firebaseapp.com",
    databaseURL: "https://jobs-c273f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "jobs-c273f",
    storageBucket: "jobs-c273f.firebasestorage.app",
    messagingSenderId: "889989614380",
    appId: "1:889989614380:web:110bd51e021ce061637a89",
    measurementId: "G-R89TNKYX13"
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
  }),
  provideIndexedDb(dbConfig)]
};

