import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  HostListener,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { clamp, orderBy, remove, words } from 'lodash-es';
import {
  DeviceColumns,
  JobEntity,
  JobStatus,
} from 'src/app/entity/jobs.entity';
import { JobModel } from 'src/app/models/jobs.model';
import { saveAs } from 'file-saver';
import { ApiConfig, ApiFetchType } from 'src/app/entity/api.entity';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { siGooglesheets } from 'simple-icons';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { SearchComponent } from '../search/search.component';
import { Platform } from '@angular/cdk/platform';
interface RouteDataEntity {
  data?: JobEntity[];
}

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss'],
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
        MatDialogModule,
    ]
})
export class JobsComponent implements OnInit, AfterViewInit {
  jobs: JobModel[] = [];
  exportDisabled = false;
  excelIcon = siGooglesheets;
  hideExpired = this.storage.hide_expired;
  query: string = '';
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = DeviceColumns.desktop;

  dataSource: MatTableDataSource<JobModel> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loader: LoaderService,
    public storage: StorageService,
    private breakpointObserver: BreakpointObserver,
    private platform: Platform
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.HandsetLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.Small,
      ])
      .subscribe((result) => {
        this.displayedColumns = result.matches
          ? DeviceColumns.mobile
          : DeviceColumns.desktop;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortData = this.sortData;
    this.dataSource.filterPredicate = this.filterData;
    this.updateFilter()
  }

  private updateFilter() {
    const statuses = Object.values(JobStatus) as string[];
    this.dataSource.filter = [
      this.query,
      statuses.filter((s) => !this.storage.hide_expired || s !== JobStatus.EXPIRED).join(" "),
    ]
      .filter((t) => t.trim().length)
      .join(' ');
  }

  private filterData(data: JobModel, filter: string): boolean {
    if (!filter) {
      return true;
    }
    const parts = words(filter, /[^, ]+/g);
    const statuses = Object.values(JobStatus) as string[];
    const sts = remove(parts, (p) => statuses.includes(p));
    return sts.includes(data.status) && data.filter(parts);
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
        this.loader.hide();
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
    ${ApiConfig.BASE_URI}/${ApiFetchType.JOBS_EXPORT}`,
      'jobs.xlsx'
    );
  }

  onQuery() {
    this.query = "";
    this.updateFilter();
  }

  onHideExpired(change: MatSlideToggleChange) {
    this.storage.hide_expired = change.checked;
    this.updateFilter();
  }

  openSearchDialog() {
    if (this.dialog.getDialogById('search-dialog') !== undefined) {
      return;
    }
    const dialogRef = this.dialog.open(SearchComponent, {
      id: 'search-dialog',
      // panelClass: [
      //   this.platform.isBrowser ? 'search-overlay-desktop' : 'search-overlay-mobile',
      //   'is-active',
      // ],
      // backdropClass: 'search-backdrop',
      // hasBackdrop: true,
      restoreFocus: true,
      autoFocus: 'dialog',
      maxWidth: this.platform.isBrowser ? '800px' : '100%',
      width: this.platform.isBrowser ? '80vw' : '100%',
      data: this.query,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe((input) => {
      this.query = input || "";
      this.updateFilter();
    });

    dialogRef.keydownEvents().subscribe(($event: KeyboardEvent) => {
      switch ($event.key) {
        case 'Backspace':
          this.query = this.query.slice(0, -1);
          return this.updateFilter();
      }
      if (/^[\w ]$/.test($event.key)) {
        this.query += $event.key;
        return this.updateFilter()
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  goSearch(event: KeyboardEvent) {
    if (event.key === '/') {
      event.preventDefault();
      this.openSearchDialog();
    }
  }
}
