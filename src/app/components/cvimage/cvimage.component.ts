import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CVEntity } from 'src/app/entity/jobs.entity';

@Component({
  selector: 'app-cvimage',
  templateUrl: './cvimage.component.html',
  standalone: true,
  imports:[CommonModule],
  styleUrl: './cvimage.component.scss'
})
export class CvimageComponent {

@Input() cv !: CVEntity;

getImageStyle() {
  return {
    'background-image': `url(${this.cv.image.thumb_src})`
  };
}

}
