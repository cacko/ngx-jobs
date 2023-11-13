import { Component, Input } from '@angular/core';
import { Source } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-jobsource',
  templateUrl: './jobsource.component.html',
  styleUrl: './jobsource.component.scss'
})
export class JobsourceComponent {

  @Input() source !: Source;

  get icon(): string | null {
      switch(this.source) {
        case Source.LINKEDIN:
          return 'typSocialLinkedin';
        default:
          return null;
      }
  }
}
