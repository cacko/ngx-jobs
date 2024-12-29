import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CoverLetterEntity } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-climage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './climage.component.html',
  styleUrl: './climage.component.scss'
})
export class ClimageComponent {

@Input() cl !: CoverLetterEntity;

getImageStyle() {
  return {
    'background-image': `url(${this.cl.image.thumb_src})`
  };
}


}
