import { Component, Input, OnInit } from '@angular/core';
import { DEVICONS } from '../../entity/icons.entity';
import { SimpleIcon } from 'simple-icons';
import { CommonModule } from '@angular/common';
import { TruncateDirective } from 'src/app/directive/truncate.directive';
import { SimpleIconComponent } from '../simple-icon/simple-icon.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-jobposition',
  templateUrl: './jobposition.component.html',
  styleUrls: ['./jobposition.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TruncateDirective,
    SimpleIconComponent,
  ]
})
export class JobpositionComponent implements OnInit {

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const iconName = Object.keys(DEVICONS).reduce(
      (res, lng) => (this.position.toLowerCase().indexOf(lng) > -1 ? lng : res),
      ''
    );
    this.icon = DEVICONS[iconName];
  }

  @Input() position!: string;
  @Input() truncate: boolean = false;
  @Input() clipclick: boolean = false;

  icon?: SimpleIcon;

  onNameClick($event: any) {
    $event.stopPropagation();
    this.clipboard.copy(this.position) && this.snackBar.open(
      "Jobposition copied to clipboard",
      "OK",
      { duration: 2000 }
    );
  }
}
