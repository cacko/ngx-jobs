import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TruncateDirective } from 'src/app/directive/truncate.directive';
import { CompanyEntity } from 'src/app/entity/jobs.entity';


export enum CompanyMode {
  BRIEF = "brief",
  FULL = "full"
}

@Component({
  selector: 'app-jobcompany',
  templateUrl: './jobcompany.component.html',
  styleUrls: ['./jobcompany.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    TruncateDirective
  ]
})
export class JobcompanyComponent {

  @Input() company !: CompanyEntity;
  @Input() mode: CompanyMode = CompanyMode.BRIEF;
  @Input() truncate: boolean = false;
  modes = CompanyMode
}
