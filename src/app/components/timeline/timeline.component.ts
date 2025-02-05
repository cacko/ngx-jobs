import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MomentModule } from 'ngx-moment';
import { JobEvent } from 'src/app/entity/jobs.entity';
import { JobEventModel } from 'src/app/models/jobEvent.model';
import { JobModel } from 'src/app/models/jobs.model';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'src/app/service/user.service';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    imports: [
        CommonModule,
        MomentModule,
        MatIconModule,
        ClipboardModule,
        MatButtonModule
    ]
})
export class TimelineComponent {
  @Input() job!: JobModel;

  $isAdmin = this.userService.$isAdmin;

  constructor(private snackBar: MatSnackBar, private userService: UserService) { }

  getIcon(ev: JobEventModel): string {
    switch (ev.event) {
      case JobEvent.APPLIED:
        return 'sports_score';
      case JobEvent.INTERVIEW:
        return 'mic';
      case JobEvent.REJECT:
        return 'thumb_down';
      case JobEvent.RESPONSE:
        return 'mail';
      case JobEvent.EXPIRED:
        return 'history_off';
    }
  }

  onCopied($ev: boolean) {
    $ev &&
      this.snackBar.open('Content copied to clipboard', 'Ok', {
        duration: 2000,
      });
  }
}
