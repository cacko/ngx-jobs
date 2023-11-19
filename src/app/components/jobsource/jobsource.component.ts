import { Component, Input, OnInit } from '@angular/core';
import { SimpleIcon, siLinkedin, siPaddypower } from 'simple-icons';
import { Source } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-jobsource',
  templateUrl: './jobsource.component.html',
  styleUrl: './jobsource.component.scss',
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
    }
  }
}
