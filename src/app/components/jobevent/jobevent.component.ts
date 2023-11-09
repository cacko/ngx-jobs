import { Component, Input } from '@angular/core';
import { JobEventEntity } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-jobevent',
  templateUrl: './jobevent.component.html',
  styleUrls: ['./jobevent.component.scss']
})
export class JobeventComponent {

  @Input() event !: JobEventEntity;

}
