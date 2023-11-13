import { Component, Input } from '@angular/core';
import { JobModel } from 'src/app/models/jobs.model';
import { CVModel } from 'src/app/models/cv.model';

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrl: './jobdetails.component.scss',
})
export class JobdetailsComponent {

  @Input() job!: JobModel;


}
