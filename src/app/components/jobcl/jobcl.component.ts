import { Component, Input } from '@angular/core';
import { CoverLetterEntity } from 'src/app/entity/jobs.entity';
import { CvViewComponent } from '../cv-view/cv-view.component';
import { Dialog } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClimageComponent } from '../climage/climage.component';
import { CoverLetterModel } from 'src/app/models/cover_letter.model';
@Component({
  selector: 'app-jobcl',
  standalone: true,
  imports: [
    ClimageComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './jobcl.component.html',
  styleUrl: './jobcl.component.scss'
})
export class JobclComponent {
  @Input() cl!: CoverLetterEntity;
  @Input() truncate: boolean = false;

  constructor(public dialog: Dialog) {}

  openDialog(ev: any): void {
    const dialogRef = this.dialog.open<string>(CvViewComponent, {
      panelClass: 'cv-zoom-panel',
      backdropClass: 'cv-zoom-backdrop',
      hasBackdrop: true,
      autoFocus: 'dialog',
      data: new CoverLetterModel(this.cl),
    });
  }
}
