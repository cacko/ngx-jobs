import { Observable, Subject } from 'rxjs';

export interface IconsInterface {
  [key: string]: string;
}

export const DEVICONS: IconsInterface = {
  python: 'devicon-python-plain colored',
  php: 'devicon-php-plain colored',
  django: 'devicon-django-plain colored',
  flask: 'devicon-flask-original colored',
  linux: 'devicon-linux-plain colored',
  typescript: 'devicon-typescript-plain colored',
  fastapi: 'devicon-fastapi-plain colored',
  firebase: 'devicon-firebase-plain colored',
  android: 'evicon-android-plain colored',
  facebook: 'devicon-facebook-plain colored',
  linkedin: 'devicon-linkedin-plain colored',
};

export interface StylesEntity {
  [key: string]: string;
}

export interface StyleSubjects {
  [key: string]: Subject<StylesEntity>;
}

export interface StyleObservers {
  [key: string]: Observable<StylesEntity>;
}
