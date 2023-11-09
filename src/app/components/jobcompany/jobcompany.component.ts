import { Component, Input } from '@angular/core';
import { CompanyEntity } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-jobcompany',
  templateUrl: './jobcompany.component.html',
  styleUrls: ['./jobcompany.component.scss']
})
export class JobcompanyComponent {

  @Input() company !: CompanyEntity;

}
