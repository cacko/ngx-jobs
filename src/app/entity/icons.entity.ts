import { Observable, Subject } from 'rxjs';
import { SimpleIcon, siAmazonaws, siAndroid, siAngular, siBootstrap, siDjango, siDocker, siFacebook, siFastapi, siFirebase, siFlask, siGit, siGithub, siGo, siIonic, siJavascript, siKotlin, siLinkedin, siLinux, siMicrosoftazure, siMysql, siPhp, siPostgresql, siPython, siShell, siSwift, siTypescript } from 'simple-icons';

export interface IconsInterface {
  [key: string]: SimpleIcon;
}

export interface IconPosition {
  x: number;
  y: number;
}

export const DEVICONS: IconsInterface = {
  python: siPython,
  php: siPhp,
  django: siDjango,
  flask: siFlask,
  linux: siLinux,
  typescript: siTypescript,
  fastapi: siFastapi,
  firebase: siFirebase,
  android: siAndroid,
  linkedin: siLinkedin,
  angular: siAngular,
  azure: siMicrosoftazure,
  docker: siDocker,
  github: siGithub,
  javascript: siJavascript,
  mysql: siMysql,
  postgresql: siPostgresql,
  aws: siAmazonaws,
  bootstrap: siBootstrap,
  git: siGit,
  go: siGo,
  ionic: siIonic,
  java: siKotlin,
  swift: siSwift,
  bash: siShell
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
