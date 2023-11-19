import { Observable, Subject } from 'rxjs';

export interface IconsInterface {
  [key: string]: string;
}

export interface IconPosition {
  x: number;
  y: number;
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
  angular: 'devicon-angularjs-plain colored',
  azure: 'devicon-azure-plain colored',
  docker: 'devicon-docker-plain colored',
  github: 'devicon-github-original colored',
  javascript: 'devicon-javascript-plain colored',
  mysql: 'devicon-mysql-plain colored',
  postgresql: 'devicon-postgresql-plain colored',
  aws: 'devicon-amazonwebservices-original colored',
  bootstrap: 'devicon-bootstrap-plain colored',
  git: 'devicon-git-plain colored',
  go: 'devicon-go-original-wordmark colored',
  ionic: 'devicon-ionic-original colored',
  java: 'devicon-java-plain colored'
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
