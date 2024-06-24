import * as moment from 'moment';

export enum LocationType {
  ONSITE = 'onsite',
  HYBRID = 'hybrid',
  REMOTE = 'remote',
}

export enum JobStatus {
  PENDING = 'pending',
  REJECTED = 'rejected',
  IN_PROGRESS = 'in_progress',
  EXPIRED = "expired",
}

export enum JobEvent {
  APPLIED = 'applied',
  INTERVIEW = 'interview',
  RESPONSE = 'response',
  REJECT = 'reject',
  EXPIRED = "expired"
}

export enum Source {
  LINKEDIN = 'linkedin',
  DIRECT = 'direct',
}

export enum SkillGroup {
  BUSINESS = 'BUS',
  SOFT = 'SOFT',
  TECHNOLOGY = 'TECHNOLOGY',
  TECHNICAL = 'TECHNICAL',
}

export interface JobEventEntity {
  event: JobEvent;
  description: string;
  timestamp: moment.Moment;
}

export interface ImageEntity {
  thumb_src: string;
  webp_src: string;
  raw_src: string;
  added: moment.Moment;
}

export interface CVEntity {
  slug: string;
  name: string;
  image: ImageEntity;
}

export interface LocationEntity {
  country_iso: string;
  city: string;
}

export interface CompanyEntity {
  name: string;
  url?: string;
}

export interface SkillEntity {
  group: SkillGroup;
  name: string;
}

export interface JobEntity {
  position: string;
  company: CompanyEntity;
  id: string;
  last_modified: moment.Moment | string;
  cv: CVEntity;
  deleted: boolean;
  status: JobStatus;
  location: LocationEntity;
  onsite: LocationType;
  source: Source;
  url: string;
  events?: JobEventEntity[];
  skills?: SkillEntity[];
}

interface DC {
  desktop: string[];
  mobile: string[];
};

export const DeviceColumns: DC = {
  desktop: [
    'company',
    'position',
    'location',
    'status',
    'last_modified',
    'applied',
  ],
  mobile: [
    'company',
    'position'
  ]
}
