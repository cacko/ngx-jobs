import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { JobStatus } from 'src/app/entity/jobs.entity';

@Component({
    selector: 'app-jobstatus',
    templateUrl: './jobstatus.component.html',
    imports: [
        CommonModule,
        MatIconModule,
    ]
})
export class JobstatusComponent implements OnInit {

  @Input() status !: JobStatus;
  @Input() truncate: boolean = false;

  icon: string = '';
  label: string = '';
  classes: string = '';
  color: string = '';

  ngOnInit(): void {

    switch (this.status) {
      case JobStatus.PENDING:
        this.label = "Pending"
        this.icon = "hourglass";
        break;
      case JobStatus.IN_PROGRESS:
        this.label = "In Progress"
        this.icon = "sync";
        this.classes = "is-spinning"
        this.color = 'accent';
        break;
      case JobStatus.REJECTED:
        this.label = "Rejected";
        this.icon = "thumb_down";
        this.color = 'error'
        break;
      case JobStatus.EXPIRED:
        this.label = "Expired";
        this.icon = "history_off";
        this.color = "warn";
        break;
      default:
        this.label = this.status;
    }
  }

}
