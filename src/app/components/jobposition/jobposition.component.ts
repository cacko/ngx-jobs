import { Component, Input, OnInit } from '@angular/core';
import {DEVICONS} from '../../entity/icons.entity';

@Component({
  selector: 'app-jobposition',
  templateUrl: './jobposition.component.html',
  styleUrls: ['./jobposition.component.scss'],
})
export class JobpositionComponent implements OnInit {
  ngOnInit(): void {
    this.icon = Object.keys(DEVICONS).reduce(
      (res, lng) =>
        this.position.toLowerCase().indexOf(lng) > -1 ? DEVICONS[lng] : res,
      ''
    );
  }

  @Input() position!: string;

  icon: string = '';
}
