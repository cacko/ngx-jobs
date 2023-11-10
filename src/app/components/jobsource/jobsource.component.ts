import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Source } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-jobsource',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobsource.component.html',
  styleUrl: './jobsource.component.scss'
})
export class JobsourceComponent {

  @Input() source !: Source;

}
