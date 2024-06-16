import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkillGroup } from 'src/app/entity/jobs.entity';
import { SkillModel } from 'src/app/models/skill.model';
import {MatChipsModule} from '@angular/material/chips';
import { SimpleIconComponent } from '../simple-icon/simple-icon.component';

@Component({
  selector: 'app-jobskills',
  templateUrl: './jobskills.component.html',
  styleUrl: './jobskills.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    SimpleIconComponent
  ]
})
export class JobskillsComponent {

  @Input() skills !: SkillModel[];
  @Input() truncate: boolean = false;
  groups = SkillGroup;
}
