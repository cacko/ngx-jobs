import { Observable, Subject } from 'rxjs';
import {
  SimpleIcon,
  siAmazonwebservices,
  siAndroid,
  siAngular,
  siAnsible,
  siBootstrap,
  siCss3,
  siDatadog,
  siDjango,
  siDocker,
  siFastapi,
  siFirebase,
  siFlask,
  siGit,
  siGithub,
  siGitlab,
  siGo,
  siGoogleclassroom,
  siGrafana,
  siIonic,
  siJavascript,
  siJenkins,
  siJquery,
  siKotlin,
  siKubernetes,
  siLaravel,
  siLinkedin,
  siLinux,
  siMariadb,
  siMongodb,
  siMysql,
  siPerl,
  siPhp,
  siPostgresql,
  siPython,
  siRabbitmq,
  siRuby,
  siRust,
  siSass,
  siShell,
  siSwift,
  siTypescript,
  siUbuntu,
  siIndeed,
  siIos,
  siHtml5
} from 'simple-icons';
import { JobEvent, JobStatus } from './jobs.entity';

export interface IconsInterface {
  [key: string]: SimpleIcon;
}

export interface PositionEntity {
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
  docker: siDocker,
  github: siGithub,
  javascript: siJavascript,
  mysql: siMysql,
  postgresql: siPostgresql,
  aws: siAmazonwebservices,
  bootstrap: siBootstrap,
  git: siGit,
  go: siGo,
  ionic: siIonic,
  kotlin: siKotlin,
  swift: siSwift,
  bash: siShell,
  mongo: siMongodb,
  css: siCss3,
  laravel: siLaravel,
  jquery: siJquery,
  sass: siSass,
  rabbitmq: siRabbitmq,
  kubernetes: siKubernetes,
  grafana: siGrafana,
  perl: siPerl,
  datadog: siDatadog,
  ansible: siAnsible,
  ruby: siRuby,
  rust: siRust,
  gitlab: siGitlab,
  jenkins: siJenkins,
  mariadb: siMariadb,
  gcp: siGoogleclassroom,
  ubuntu: siUbuntu,
  indeed: siIndeed,
  ios: siIos,
  html: siHtml5,
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

export interface IconFor {
  label: string;
  icon: string;
  classes?: string;
  color?: string;
}

export const getIconFor = (status: JobStatus) => {
  switch (status) {
    case JobStatus.PENDING:
      return {
        label: "Pending",
        icon: "hourglass"
      };
    case JobStatus.IN_PROGRESS:
      return {
        label: "In Progress",
        icon: "sync",
        classes: "is-spinning",
        color: 'accent'
      };
    case JobStatus.REJECTED:
      return {
        label: "Rejected",
        icon: "thumb_down",
        color: "error"
      };
    case JobStatus.EXPIRED:
      return {
        label: "Expired",
        icon: "history_off",
        color: "warn"
      };
    default:
      return {
        label: "N/A",
        icon: "info",
      };
  }
}

export const getEventIconFor = (event: JobEvent) => {
  switch (event) {
    case JobEvent.INTERVIEW:
      return {
        label: "Interview",
        icon: "mic"
      };
    case JobEvent.APPLIED:
      return {
        label: "Applied",
        icon: "sports_score",
        classes: "is-spinning",
        color: 'accent'
      };
    case JobEvent.REJECT:
      return {
        label: "Rejected",
        icon: "thumb_down",
        color: "error"
      };
    case JobEvent.RESPONSE:
      return {
        label: "Response",
        icon: "mail",
        color: "warn"
      };
    case JobEvent.EXPIRED:
      return {
        label: "history_off",
        icon: "mail",
        color: "warn"
      };
    default:
      return {
        label: "N/A",
        icon: "info",
      };
  }
}