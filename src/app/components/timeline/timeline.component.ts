import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobEvent } from 'src/app/entity/jobs.entity';
import { JobEventModel } from 'src/app/models/jobEvent.model';
import { JobModel } from 'src/app/models/jobs.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {
  @Input() job!: JobModel;

  constructor(private snackBar: MatSnackBar) {}

  getIcon(ev: JobEventModel): string {
    switch (ev.event) {
      case JobEvent.APPLIED:
        return 'typFlag';
      case JobEvent.INTERVIEW:
        return 'typMicrophone';
      case JobEvent.REJECT:
        return 'typThumbsDown';
      case JobEvent.RESPONSE:
        return 'typMail';
    }
  }

  onCopied($ev: boolean) {
    $ev &&
      this.snackBar.open('Content copied to clipboard', 'Ok', {
        duration: 2000,
      });
  }
}
