import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobEvent, JobEventEntity } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-jobevents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobevents.component.html',
  styleUrl: './jobevents.component.scss'
})
export class JobeventsComponent {

  @Input() events !: JobEventEntity[];

}
