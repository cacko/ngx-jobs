import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { JobEntity } from 'src/app/entity/jobs.entity';
import { JobModel } from 'src/app/models/jobs.model';
import { JobpositionComponent } from '../jobposition/jobposition.component';
import { JobdetailsComponent } from '../jobdetails/jobdetails.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { LoaderService } from 'src/app/service/loader.service';
import { JobService } from 'src/app/service/job.service';

interface RouteDataEntity {
  data?: JobEntity;
}

@Component({
    selector: 'app-job',
    templateUrl: './job.component.html',
    imports: [
        CommonModule,
        JobpositionComponent,
        JobdetailsComponent,
        TimelineComponent
    ]
})
export class JobComponent implements OnInit {

  job !: JobModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobService: JobService,
    private router: Router,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get("id"));
      this.jobService.getJob(params.get("id") || "").subscribe((data: JobEntity) => {
        this.loader.hide();
        const job = new JobModel(data);
        this.job = job;
      })
    })
      // next: (data: RouteDataEntity) => {
      //   this.loader.hide();
      //   const job = new JobModel(data.data as JobEntity);
      //   this.job = job;
      // },
    // });
  }

  async onBack() {
    await this.router.navigateByUrl("/");
  }

  onUpdated(job: JobModel) {
    this.job = job;
  }
}
