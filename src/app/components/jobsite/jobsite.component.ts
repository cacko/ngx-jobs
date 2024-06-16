import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationType } from 'src/app/entity/jobs.entity';
import { TruncateDirective } from 'src/app/directive/truncate.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-jobsite',
  templateUrl: './jobsite.component.html',
  styleUrl: './jobsite.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    TruncateDirective,
    MatTooltipModule
  ]
})
export class JobsiteComponent {

  @Input() onsite !: LocationType;
  @Input() truncate: boolean = false;

}
