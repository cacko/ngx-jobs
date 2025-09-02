import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { JobEntity, JobEvent, JobStatus } from 'src/app/entity/jobs.entity';
import { NgPipesModule } from 'ngx-pipes';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { ApiPutType } from 'src/app/entity/api.entity';
import { getEventIconFor } from 'src/app/entity/icons.entity';

@Component({
  selector: 'app-input',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatInputModule, MatButtonModule, NgPipesModule, MatDialogModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  form: FormGroup;
  EVENTS = JobEvent;
  getIcon = getEventIconFor;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public dialog: MatDialogRef<InputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { job_id: string, usermail: string }
  ) {
    this.form = this.fb.group({
      event: JobEvent,
      description: ""
    });
  }



  public onSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (this.form.valid) {
      this.api.put(ApiPutType.EVENTS, this.data.usermail, Object.assign({
        job_id: this.data.job_id
      }, this.form.value)).subscribe((data: JobEntity) => {
        this.dialog.close(data.id)
      })

    }
  }

}
