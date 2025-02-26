import { Component, Input, OnInit } from '@angular/core';
import { LocationEntity, LocationType } from 'src/app/entity/jobs.entity';
import {
  getEmojiFlag,
  getCountryData,
  TCountryCode,
} from 'countries-list'
import { CommonModule } from '@angular/common';
import { TruncateDirective } from 'src/app/directive/truncate.directive';

export enum LocationModes {
  BRIEF = "brief",
  FULL = "full"
}

@Component({
    selector: 'app-joblocation',
    templateUrl: './joblocation.component.html',
    styleUrls: ['./joblocation.component.scss'],
    imports: [
        CommonModule,
        TruncateDirective
    ]
})
export class JoblocationComponent implements OnInit {

  @Input() truncate: boolean = false;
  @Input() location !: LocationEntity;
  city !: string;
  country !: string;
  flag !: string;
  @Input() mode : string = "brief";
  modes = LocationModes;

  ngOnInit(): void {
    this.city = this.location.city || LocationType.REMOTE;
    switch (this.city) {
      case LocationType.REMOTE:
        this.city = this.city.toUpperCase();
        this.country = "N/A";
        this.flag = "🇺🇳";
        break;
      default:
        this.country = getCountryData(this.location.country_iso as TCountryCode)?.name;
        this.flag = getEmojiFlag(this.location.country_iso as TCountryCode);
    }
  }

}
