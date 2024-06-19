import { Component, Input } from '@angular/core';
import { JobModel } from 'src/app/models/jobs.model';
import { CompanyMode, JobcompanyComponent } from 'src/app/components/jobcompany/jobcompany.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { JobsourceComponent } from '../jobsource/jobsource.component';
import { JobskillsComponent } from '../jobskills/jobskills.component';
import { JoblocationComponent } from '../joblocation/joblocation.component';
import { JobcvComponent } from '../jobcv/jobcv.component';
import { JoburlComponent } from '../joburl/joburl.component';
import { JobsiteComponent } from '../jobsite/jobsite.component';

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    JobsourceComponent,
    JoblocationComponent,
    JobskillsComponent,
    JobsourceComponent,
    JobcvComponent,
    JoburlComponent,
    JobsiteComponent,
    JobcompanyComponent
  ]
})
export class JobdetailsComponent {

  @Input() job!: JobModel;
  companyModes = CompanyMode;

}
