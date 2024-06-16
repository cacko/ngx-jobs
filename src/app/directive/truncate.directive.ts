import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[truncate]',
  standalone: true
})
export class TruncateDirective {
  @Input() truncate: boolean = false;

  @HostBinding('class') get class() {
    return this.truncate ? 'app-truncate' : null;
  }

  constructor() { }
}
