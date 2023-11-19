import { Component, Input, OnInit } from '@angular/core';
import { JobStatus } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-jobstatus',
  templateUrl: './jobstatus.component.html',
  styleUrls: ['./jobstatus.component.scss']
})
export class JobstatusComponent implements OnInit {

  @Input() status !: JobStatus;

  icon: string = '';

  ngOnInit(): void {
      switch (this.status) {
        case JobStatus.PENDING:
          this.icon = "hourglass";
          break;
        case JobStatus.IN_PROGRESS:
          this.icon = "sync";
          break;
        case JobStatus.REJECTED:
          this.icon = "thumb_down";
          break;
      }
  }

}
