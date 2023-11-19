import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[truncate]',
})
export class TruncateDirective {
  @Input() truncate: boolean = false;

  @HostBinding('class') get class() {
    return this.truncate ? 'app-truncate' : null;
  }

  constructor() {}
}
