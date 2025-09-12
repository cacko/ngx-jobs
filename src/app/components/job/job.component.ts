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
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  imports: [
    CommonModule,
    JobpositionComponent,
    JobdetailsComponent,
    TimelineComponent,
  ],
})
export class JobComponent implements OnInit {
  private jobSubject = new BehaviorSubject<JobModel | null>(null);
  $job = this.jobSubject.asObservable();

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobService: JobService,
    private router: Router,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.jobService
        .getJob(params.get('email') || '', params.get('id') || '')
        .subscribe((data: JobEntity) => {
          this.loader.hide();
          const job = new JobModel(data);
          this.jobSubject.next(job);
          this.jobService.startUpdates(params.get('email') || '');
        });
    });
  }

  async onBack() {
    await this.router.navigateByUrl(
      `/${this.jobSubject.getValue()?.useremail}`
    );
  }

  onUpdated(job: JobModel) {
    this.jobSubject.next(job);
  }
}
