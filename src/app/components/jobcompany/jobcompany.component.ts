import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-jobcompany',
  templateUrl: './jobcompany.component.html',
  styleUrls: ['./jobcompany.component.scss']
})
export class JobcompanyComponent {

  @Input() company !: string;

}
