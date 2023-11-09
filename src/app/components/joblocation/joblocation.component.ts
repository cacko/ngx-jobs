import { Component, Input } from '@angular/core';
import { LocationEntity } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-joblocation',
  templateUrl: './joblocation.component.html',
  styleUrls: ['./joblocation.component.scss']
})
export class JoblocationComponent {

  @Input() location !: LocationEntity;

}
