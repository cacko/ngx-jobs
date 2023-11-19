import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { clamp, orderBy, sortBy } from 'lodash-es';
import { JobEntity } from 'src/app/entity/jobs.entity';
import { JobModel } from 'src/app/models/jobs.model';
import { saveAs } from 'file-saver';
import { ApiConfig, ApiType } from 'src/app/entity/api.entity';
import { ApiService } from 'src/app/service/api.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
interface RouteDataEntity {
  data?: JobEntity[];
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit, AfterViewInit {
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

  dataSource: MatTableDataSource<JobModel> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortData = this.sortData;
  }

  private sortData(data: JobModel[], sort: Sort): JobModel[] {
    return data.sort((a, b) => {
      console.log(a, b);
      const d = sort.direction === 'asc' ? 1 : -1;
      switch (sort.active) {
        case 'company':
          return a.company.name.localeCompare(b.company.name) * d;
        case 'position':
          return a.position.localeCompare(b.position) * d;
        case 'location':
          return a.location.city.localeCompare(b.location.city) * d;
        case 'status':
          return a.status.localeCompare(b.status) * d;
        case 'last_modified':
        case 'applied':
          return (
            clamp(a.last_modified.unix() - b.last_modified.unix(), -1, 1) * d
          );
        default:
          return 0;
      }
    });
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe({
      next: (data: RouteDataEntity) => {
        const jobs = orderBy(
          data.data as JobEntity[],
          ['last_modified'],
          ['desc']
        );
        this.jobs = jobs.map((data) => new JobModel(data));
        this.dataSource.data = this.jobs;
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

  onClick(ev: Event, row: JobModel) {
    this.router.navigateByUrl(`/v/${row.id}`);
  }

  onExport() {
    saveAs(
      `
    ${ApiConfig.BASE_URI}/${ApiType.JOBS_EXPORT}`,
      'jobs.xlsx'
    );
  }
}
