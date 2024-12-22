import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SimpleIcon, siIndeed, siLinkedin, siPaddypower } from 'simple-icons';
import { Source } from 'src/app/entity/jobs.entity';
import { SimpleIconComponent } from '../simple-icon/simple-icon.component';

@Component({
  selector: 'app-jobsource',
  templateUrl: './jobsource.component.html',
  styleUrl: './jobsource.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    SimpleIconComponent
  ]
})
export class JobsourceComponent implements OnInit {
  @Input() source!: Source;

  icon?: SimpleIcon;

  ngOnInit(): void {
    switch (this.source) {
      case Source.LINKEDIN:
        this.icon = siLinkedin;
        break;
      case Source.DIRECT:
        this.icon = siPaddypower;
        break;
      case Source.INDEED:
        console.log(siIndeed);
        this.icon = siIndeed;
        break;
    }
  }
}
