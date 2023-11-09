import { Component, Input } from '@angular/core';
import { JobEntity } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent {


  @Input() job !: JobEntity;


}
