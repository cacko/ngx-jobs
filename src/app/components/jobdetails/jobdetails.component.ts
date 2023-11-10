import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobModel } from 'src/app/models/jobs.model';

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrl: './jobdetails.component.scss'
})
export class JobdetailsComponent {

  @Input() job !: JobModel;


}
