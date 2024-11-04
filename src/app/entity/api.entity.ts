import { JobEvent } from "./jobs.entity";

export enum ApiConfig {
  BASE_URI = 'https://jobs.cacko.net/api',
  // BASE_URI = 'http://localhost:44551/api',
}

export enum ApiFetchType {
  JOBS = 'jobs',
  JOB = 'job',
  JOBS_EXPORT = 'jobs.xlsx',
}

export enum ApiPutType {
  EVENTS = 'events',
}

export enum WSLoading {
  BLOCKING_ON = 'blocking_on',
  BLOCKING_OFF = 'blocking_off',
  MESSAGE_OFF = 'message_off',
  MESSAGE_ON = 'message_on',
}

export interface EventRequest {
  job_id: string;
  event: JobEvent;
  description: string;
}

export interface Admins {
  [key: string]: string;
}