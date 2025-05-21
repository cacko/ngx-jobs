import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SimpleIcon, siIndeed, siPaddypower, siWelcometothejungle } from 'simple-icons';
import { Source } from 'src/app/entity/jobs.entity';
import { SimpleIconComponent } from '../simple-icon/simple-icon.component';
import { ccLinkedIn } from 'src/app/entity/icons.entity';
import { NounderscorePipe } from 'src/app/pipes/nounderscore.pipe';

@Component({
  selector: 'app-jobsource',
  templateUrl: './jobsource.component.html',
  styleUrl: './jobsource.component.scss',
  imports: [
    CommonModule,
    SimpleIconComponent,
    NounderscorePipe
  ]
})
export class JobsourceComponent implements OnInit {
  @Input() source!: Source;

  icon?: SimpleIcon;

  ngOnInit(): void {
    switch (this.source) {
      case Source.LINKEDIN:
        this.icon = ccLinkedIn;
        break;
      case Source.DIRECT:
        this.icon = siPaddypower;
        break;
      case Source.INDEED:
        this.icon = siIndeed;
        break;
      case Source.WELCOMETOTHEJUNGLR:
        this.icon = siWelcometothejungle;
        break;
    }
  }
}
