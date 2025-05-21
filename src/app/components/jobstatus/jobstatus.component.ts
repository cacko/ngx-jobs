import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { getIconFor } from 'src/app/entity/icons.entity';
import { JobStatus } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-jobstatus',
  templateUrl: './jobstatus.component.html',
  imports: [
    CommonModule,
    MatIconModule,
  ]
})
export class JobstatusComponent implements OnInit {

  @Input() status !: JobStatus;
  @Input() trunc: boolean = false;

  icon: string = '';
  label: string = '';
  classes: string = '';
  color: string = '';

  ngOnInit(): void {

    const res = getIconFor(this.status);
    this.label = res.label;
    this.icon = res.icon;
    this.classes = res.classes || '';
    this.color = res.color || '';
  }

}
