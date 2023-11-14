import { Component, Input, OnInit } from '@angular/core';
import { LocationEntity } from 'src/app/entity/jobs.entity';
import {
  getEmojiFlag,
  ICountryData,
  getCountryData,
  TCountryCode,
} from 'countries-list'

export enum LocationModes {
  BRIEF = "brief",
  FULL = "full"
}

@Component({
  selector: 'app-joblocation',
  templateUrl: './joblocation.component.html',
  styleUrls: ['./joblocation.component.scss']
})
export class JoblocationComponent implements OnInit {

  @Input() location !: LocationEntity;
  data !: ICountryData;
  flag !: string;
  @Input() mode : string = "brief";
  modes = LocationModes;

  ngOnInit(): void {
    this.data = getCountryData(this.location.country_iso as TCountryCode);
    this.flag = getEmojiFlag(this.location.country_iso as TCountryCode);
  }

}
