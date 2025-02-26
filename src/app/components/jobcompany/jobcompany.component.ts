import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TruncateDirective } from 'src/app/directive/truncate.directive';
import { CompanyEntity } from 'src/app/entity/jobs.entity';


export enum CompanyMode {
  BRIEF = "brief",
  FULL = "full"
}

@Component({
    selector: 'app-jobcompany',
    templateUrl: './jobcompany.component.html',
    styleUrls: ['./jobcompany.component.scss'],
    imports: [
        CommonModule,
        MatIconModule,
        TruncateDirective
    ]
})
export class JobcompanyComponent {

  @Input() company !: CompanyEntity;
  @Input() mode: CompanyMode = CompanyMode.BRIEF;
  @Input() truncate: boolean = false;
  @Input() clipclick: boolean = false;
  modes = CompanyMode

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) {

  }

  onNameClick($event: any) {
    $event.stopPropagation();
    this.clipboard.copy(this.company.name) && this.snackBar.open(
      "Company name copied to clipboard",
      "OK",
      { duration: 2000 }
    );
  }

}
