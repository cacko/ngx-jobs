import { CommonModule } from '@angular/common';
import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MomentModule } from 'ngx-moment';
import { JobEventModel } from 'src/app/models/jobEvent.model';
import { JobModel } from 'src/app/models/jobs.model';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { InputComponent } from '../input/input.component';
import { getEventIconFor } from 'src/app/entity/icons.entity';
import { StorageService } from 'src/app/service/storage.service';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  imports: [
    CommonModule,
    MomentModule,
    MatIconModule,
    ClipboardModule,
    MatButtonModule,
    OverlayModule
  ]
})
export class TimelineComponent {
  @Input() job!: JobModel;
  readonly dialog = inject(MatDialog);
  $isAdmin = this.userService.$isAdmin;
  @Output() updated = new EventEmitter<JobModel>();


  constructor(private snackBar: MatSnackBar, private userService: UserService, private storage: StorageService) { }

  getIcon(ev: JobEventModel): string {
    return getEventIconFor(ev.event).icon;
  }

  onAddEvent(event: MouseEvent) {
    const dialogRef = this.dialog.open(InputComponent, {
      hasBackdrop: true,
      panelClass: "event-form",
      backdropClass: "backdrop",
      data: { job_id: this.job.id }
    });

    dialogRef.afterClosed().subscribe(jobId => {
      console.log(jobId);
      if (jobId) {
        this.storage.getJob(jobId).subscribe((entity) => {
          this.job = new JobModel(entity);
          this.updated.emit(this.job);
        })
      }
    });
  }

  onCopied($ev: boolean) {
    $ev &&
      this.snackBar.open('Content copied to clipboard', 'Ok', {
        duration: 2000,
      });
  }
}
