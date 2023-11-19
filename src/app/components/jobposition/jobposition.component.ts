import { Component, Input, OnInit } from '@angular/core';
import { DEVICONS } from '../../entity/icons.entity';
import { SimpleIcon } from 'simple-icons';

@Component({
  selector: 'app-jobposition',
  templateUrl: './jobposition.component.html',
  styleUrls: ['./jobposition.component.scss'],
})
export class JobpositionComponent implements OnInit {
  ngOnInit(): void {
    const iconName = Object.keys(DEVICONS).reduce(
      (res, lng) =>
        this.position.toLowerCase().indexOf(lng) > -1 ? lng : res,
      ''
    );
    this.icon = DEVICONS[iconName];
  }

  @Input() position!: string;
  @Input() truncate: boolean = false;

  icon?: SimpleIcon;
}
