export enum ApiConfig {
  BASE_URI = 'https://jobs.cacko.net/api',
}

export enum ApiType {
  JOBS = 'jobs',
  JOB = 'job',
}

export interface JobEntity {

}

export enum WSLoading {
  BLOCKING_ON = 'blocking_on',
  BLOCKING_OFF = 'blocking_off',
  MESSAGE_OFF = 'message_off',
  MESSAGE_ON = 'message_on',
}
