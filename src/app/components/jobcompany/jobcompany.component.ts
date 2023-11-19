import { Component, Input } from '@angular/core';
import { CompanyEntity } from 'src/app/entity/jobs.entity';


export enum CompanyMode {
  BRIEF = "brief",
  FULL = "full"
}

@Component({
  selector: 'app-jobcompany',
  templateUrl: './jobcompany.component.html',
  styleUrls: ['./jobcompany.component.scss']
})
export class JobcompanyComponent {

  @Input() company !: CompanyEntity;
  @Input() mode: CompanyMode = CompanyMode.BRIEF;
  @Input() truncate: boolean = false;
  modes = CompanyMode
}
