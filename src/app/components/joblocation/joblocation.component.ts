import { Component, Input } from '@angular/core';
import { LocationEntity } from 'src/app/entity/jobs.entity';
import {
  getEmojiFlag,
  ICountryData,
  getCountryData,
  TCountryCode,
} from 'countries-list'

@Component({
  selector: 'app-joblocation',
  templateUrl: './joblocation.component.html',
  styleUrls: ['./joblocation.component.scss']
})
export class JoblocationComponent {

  @Input() location !: LocationEntity;

  get data(): ICountryData {
    return getCountryData(this.location.country_iso as TCountryCode);
  }

  get flag(): string {
    return getEmojiFlag(this.location.country_iso as TCountryCode);
  }

}
