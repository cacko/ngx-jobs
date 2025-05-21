import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TruncateDirective } from 'src/app/directive/truncate.directive';
@Component({
    selector: 'app-joburl',
    templateUrl: './joburl.component.html',
    styleUrl: './joburl.component.scss',
    imports: [
        CommonModule,
        TruncateDirective
    ]
})
export class JoburlComponent {
  @Input() url!: string;
  @Input() trunc: boolean = false;
}
