import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationType } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-jobsite',
  templateUrl: './jobsite.component.html',
  styleUrl: './jobsite.component.scss'
})
export class JobsiteComponent {

  @Input() onsite !: LocationType;
  @Input() truncate: boolean = false;

}
