import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobEntity } from 'src/app/entity/jobs.entity';
import { JobModel } from 'src/app/models/jobs.model';
import { JobpositionComponent } from '../jobposition/jobposition.component';
import { JobdetailsComponent } from '../jobdetails/jobdetails.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { LoaderService } from 'src/app/service/loader.service';

interface RouteDataEntity {
  data?: JobEntity;
}

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  standalone: true,
  imports: [
    CommonModule,
    JobpositionComponent,
    JobdetailsComponent,
    TimelineComponent
  ]
})
export class JobComponent implements OnInit {

  job !: JobModel;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private loader: LoaderService) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe({
      next: (data: RouteDataEntity) => {
        this.loader.hide();
        const job = new JobModel(data.data as JobEntity);
        this.job = job;
      },
    });
  }

  async onBack() {
    await this.router.navigateByUrl("/");
  }
}
