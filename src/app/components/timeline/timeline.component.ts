import { Component, Input } from '@angular/core';
import { JobModel } from 'src/app/models/jobs.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {

  @Input() job !: JobModel;

}
