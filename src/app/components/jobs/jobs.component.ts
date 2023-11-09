import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { orderBy } from 'lodash-es';
import { JobEntity } from 'src/app/entity/jobs.entity';
import { JobModel } from 'src/app/models/jobs.model';

interface RouteDataEntity {
  data?: JobEntity[];
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  jobs: JobModel[] = [];

  displayedColumns = [
    'company',
    'position',
    'location',
    'status',
    'applied'
  ];
  ngOnInit() {
    this.activatedRoute.data.subscribe({
      next: (data: RouteDataEntity) => {
        const jobs = orderBy(data.data as JobEntity[], ['last_modified'], ['desc']);
        this.jobs = jobs.map((data) => new JobModel(data));
      },
    });
  }
}
