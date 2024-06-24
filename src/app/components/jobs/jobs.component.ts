import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { clamp, orderBy } from 'lodash-es';
import { DeviceColumns, JobEntity, JobStatus } from 'src/app/entity/jobs.entity';
import { JobModel } from 'src/app/models/jobs.model';
import { saveAs } from 'file-saver';
import { ApiConfig, ApiType } from 'src/app/entity/api.entity';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { siMicrosoftexcel } from 'simple-icons';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { StorageService } from 'src/app/service/storage.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SimpleIconComponent } from '../simple-icon/simple-icon.component';
import { JobcompanyComponent } from '../jobcompany/jobcompany.component';
import { JobpositionComponent } from '../jobposition/jobposition.component';
import { JoblocationComponent } from '../joblocation/joblocation.component';
import { MomentModule } from 'ngx-moment';
import { JobstatusComponent } from '../jobstatus/jobstatus.component';
import { TruncateDirective } from 'src/app/directive/truncate.directive';
import { LoaderService } from 'src/app/service/loader.service';
import { MatButtonModule } from '@angular/material/button';
interface RouteDataEntity {
  data?: JobEntity[];
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    SimpleIconComponent,
    MatSlideToggleModule,
    MatTableModule,
    JobcompanyComponent,
    JobpositionComponent,
    JoblocationComponent,
    MomentModule,
    JobstatusComponent,
    TruncateDirective,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
  ]
})
export class JobsComponent implements OnInit, AfterViewInit {
  jobs: JobModel[] = [];
  exportDisabled = false;
  excelIcon = siMicrosoftexcel;
  hideExpired = this.storage.hide_expired;

  displayedColumns: string[] = DeviceColumns.desktop;

  dataSource: MatTableDataSource<JobModel> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loader: LoaderService,
    public storage: StorageService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.Small
    ]).subscribe(result => {
      this.displayedColumns = result.matches ? DeviceColumns.mobile : DeviceColumns.desktop;
    });


  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortData = this.sortData;
    this.dataSource.filterPredicate = this.filterData;
    this.dataSource.filter = this.storage.hide_expired ? JobStatus.EXPIRED : "";
  }

  private filterData(data: JobModel, filter: string): boolean {
    return !filter || data.status != filter;
  }

  private sortData(data: JobModel[], sort: Sort): JobModel[] {
    return data.sort((a, b) => {
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
        this.jobs = jobs
          .filter((je) => !je.deleted)
          .map((data) => new JobModel(data));
        this.dataSource.data = this.jobs;
        this.loader.hide()
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

  onHideExpired(change: MatSlideToggleChange) {
    this.storage.hide_expired = change.checked;
    this.dataSource.filter = change.checked ? JobStatus.EXPIRED : "";
  }
}
