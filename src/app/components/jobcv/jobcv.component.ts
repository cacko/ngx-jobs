import { Component, Input } from '@angular/core';
import { CVEntity } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-jobcv',
  templateUrl: './jobcv.component.html',
  styleUrls: ['./jobcv.component.scss']
})
export class JobcvComponent {

  @Input() cv !: CVEntity;

}
