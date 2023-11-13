import { Component, Input, OnInit } from '@angular/core';
import { Source } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-jobsource',
  templateUrl: './jobsource.component.html',
  styleUrl: './jobsource.component.scss'
})
export class JobsourceComponent implements OnInit {

  @Input() source !: Source;

  icon: string = '';

  ngOnInit(): void {
      switch(this.source) {
        case Source.LINKEDIN:
          this.icon = 'remixLinkedinBoxFill';
          break;
        default:
          this.icon = "";
      }
  }
}
