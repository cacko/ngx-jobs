import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { orderBy } from 'lodash-es';
import { JobEntity } from 'src/app/entity/jobs.entity';
import { JobModel } from 'src/app/models/jobs.model';
import { JobsService } from 'src/app/service/jobs.service';
import { saveAs} from 'file-saver';
import { APP_BASE_HREF } from '@angular/common';
import { ApiConfig, ApiType } from 'src/app/entity/api.entity';
import { ApiService } from 'src/app/service/api.service';

interface RouteDataEntity {
  data?: JobEntity[];
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  jobs: JobModel[] = [];
  exportDisabled = false;

  displayedColumns = [
    'company',
    'position',
    'location',
    'status',
    'last_modified',
    'applied',
  ];
  ngOnInit() {
    this.activatedRoute.data.subscribe({
      next: (data: RouteDataEntity) => {
        const jobs = orderBy(
          data.data as JobEntity[],
          ['last_modified'],
          ['desc']
        );
        this.jobs = jobs.map((data) => new JobModel(data));
      },
    });
  }

  onClickCompany(ev: MouseEvent, row: JobModel) {
    const url = row.company.url;
    if (!url) {
      return;
    }
    ev.stopPropagation();
    return window.open(row.company.url, '_blank', 'noopener');
  }

  onClick(ev: MouseEvent, row: JobModel) {
    this.router.navigateByUrl(`/v/${row.id}`);
  }

  onExport() {
    saveAs(`
    ${ApiConfig.BASE_URI}/${ApiType.JOBS_EXPORT}`,
    "jobs.xlsx"
    );
  }
}
