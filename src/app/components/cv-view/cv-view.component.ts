import { Component, Inject } from '@angular/core';
import { snakeCase } from 'lodash-es';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { CVEntity } from 'src/app/entity/jobs.entity';
import { CVModel } from 'src/app/models/cv.model';

@Component({
  selector: 'app-cv-view',
  templateUrl: './cv-view.component.html',
  styleUrl: './cv-view.component.scss'
})
export class CvViewComponent {

  constructor(
    public userService: UserService,
    public dialogRef: DialogRef<string>,
    private snackbar: MatSnackBar,
    private router: Router,
    @Inject(DIALOG_DATA)
    public data: CVModel
  ) {

  }

  onClose() {
    this.dialogRef.close();
  }

}
