import { Component, Input, OnInit } from '@angular/core';
import { JobStatus } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-jobstatus',
  templateUrl: './jobstatus.component.html',
  styleUrls: ['./jobstatus.component.scss']
})
export class JobstatusComponent {

  @Input() status !: JobStatus;

  get icon(): string {
      switch (this.status) {
        case JobStatus.PENDING:
          return "typWatch";
        case JobStatus.IN_PROGRESS:
          return "typFlash";
        case JobStatus.REJECTED:
          return "typThumbsDown";
      }
      return "";
  }

}
