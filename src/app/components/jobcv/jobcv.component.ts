import { Component, Input } from '@angular/core';
import { CVEntity } from 'src/app/entity/jobs.entity';
import { CvViewComponent } from '../cv-view/cv-view.component';
import { CVModel } from 'src/app/models/cv.model';
import { Dialog } from '@angular/cdk/dialog';
import { CvimageComponent } from '../cvimage/cvimage.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-jobcv',
  templateUrl: './jobcv.component.html',
  styleUrls: ['./jobcv.component.scss'],
  standalone: true,
  imports: [
    CvimageComponent,
    CommonModule,
    MatIconModule
  ]
})
export class JobcvComponent {
  @Input() cv!: CVEntity;
  @Input() truncate: boolean = false;

  constructor(public dialog: Dialog) {}

  openDialog(ev: any): void {
    const dialogRef = this.dialog.open<string>(CvViewComponent, {
      panelClass: 'cv-zoom-panel',
      backdropClass: 'cv-zoom-backdrop',
      hasBackdrop: true,
      autoFocus: 'dialog',
      data: new CVModel(this.cv),
    });
  }
}
