import { Component, Input } from '@angular/core';
import { SkillGroup } from 'src/app/entity/jobs.entity';
import { SkillModel } from 'src/app/models/skill.model';

@Component({
  selector: 'app-jobskills',
  templateUrl: './jobskills.component.html',
  styleUrl: './jobskills.component.scss'
})
export class JobskillsComponent {

  @Input() skills !: SkillModel[];
  groups = SkillGroup;
}
