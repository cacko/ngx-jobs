import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobEntity } from 'src/app/entity/jobs.entity';
import { JobModel } from 'src/app/models/jobs.model';

interface RouteDataEntity {
  data?: JobEntity;
}

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {

  job !: JobModel;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe({
      next: (data: RouteDataEntity) => {
        const job = new JobModel(data.data as JobEntity);
        this.job = job;
      },
    });
  }

  async onBack() {
    await this.router.navigateByUrl("/");
  }
}
