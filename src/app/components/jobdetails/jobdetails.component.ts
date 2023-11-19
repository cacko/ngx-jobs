import { Component, Input } from '@angular/core';
import { JobModel } from 'src/app/models/jobs.model';
import { CompanyMode } from 'src/app/components/jobcompany/jobcompany.component';

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrl: './jobdetails.component.scss',
})
export class JobdetailsComponent {

  @Input() job!: JobModel;
  companyModes = CompanyMode;

}
