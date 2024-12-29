import { Component, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { CVModel } from 'src/app/models/cv.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CoverLetterModel } from 'src/app/models/cover_letter.model';

@Component({
  selector: 'app-cv-view',
  templateUrl: './cv-view.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrl: './cv-view.component.scss'
})
export class CvViewComponent {

  constructor(
    public userService: UserService,
    public dialogRef: DialogRef<string>,
    private snackbar: MatSnackBar,
    private router: Router,
    @Inject(DIALOG_DATA)
    public data: CVModel|CoverLetterModel
  ) {

  }

  onClose() {
    this.dialogRef.close();
  }

}
